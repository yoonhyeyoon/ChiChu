from datetime import datetime
from email.mime import application
from h11 import PRODUCT_ID
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from django.shortcuts import get_object_or_404
import pymysql
import json

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chichu.settings")

import django
django.setup()

from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User
from .serializers import (
    PopularSerializer, ReasonableSerializer, ChichuIndexSerializer, CheapSerializer, CoverageSerializer )

# 1 - 1차 검색
@api_view(['GET'])
def default(request, age, gender):
    popular_list = []
    reasonable_list = []
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []


    # 필요한 기본 DB 정보
    host = "j6d206.p.ssafy.io" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor)
    # http://127.0.0.1:8000/search/default/30/2/ 

     # 3. SQL문 작성
    # (1) 인기 상품 : 성별 + 연령 + 유저지수 가장 높은 상품 순서대로
    popular_sql =f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(A.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(A.PRODUCT_OPTION) AS option_name
    FROM
    PRODUCT_OPTION A, 
    PRODUCT_RATE B,
    PRODUCT C,
    COMPANY D
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender}
    GROUP BY chichu.B.USER_INDEX
    ORDER BY B.USER_INDEX DESC 
    LIMIT 6;
    """

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]

    reasonable_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(E.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(E.PRODUCT_OPTION) AS option_name
    FROM ( 
        SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE 
        FROM PRODUCT_OPTION 
        GROUP BY PRODUCT_CODE 
        ) A, 
    PRODUCT_RATE B, 
    PRODUCT C,
    COMPANY D,
    PRODUCT_OPTION E
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = E.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE 
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender} 
    GROUP BY chichu.A.COVERAGE / (B.RATE * B.PY)
    ORDER BY A.COVERAGE / (B.RATE * B.PY) DESC 
    LIMIT 6
    """


    # (3) 치츄 지수 높은 순
    high_ci_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(A.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(A.PRODUCT_OPTION) AS option_name
    FROM
    PRODUCT_OPTION A, 
    PRODUCT_RATE B,
    PRODUCT C,
    COMPANY D
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND B.PY = 10 
    AND AGE = {age}
    AND GENDER = {gender} 
    GROUP BY chichu.B.TOTAL_INDEX
    ORDER BY B.TOTAL_INDEX DESC 
    """
    
    # (4) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(A.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(A.PRODUCT_OPTION) AS option_name
    FROM
    PRODUCT_OPTION A, 
    PRODUCT_RATE B,
    PRODUCT C,
    COMPANY D
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND B.PY = 10 
    AND AGE = {age}
    AND GENDER = {gender} 
    GROUP BY chichu.B.RATE
    ORDER BY B.RATE
    """

    # (5) 보장금액 높은 순
    high_coverage_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(E.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(E.PRODUCT_OPTION) AS option_name

    FROM ( 
        SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE 
        FROM PRODUCT_OPTION 
        GROUP BY PRODUCT_CODE 
        ) A, 
    PRODUCT_RATE B, 
    PRODUCT C,
    COMPANY D,
    PRODUCT_OPTION E
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = E.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE 
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender} 
    AND PY = 10
    GROUP BY chichu.A.COVERAGE
    ORDER BY A.COVERAGE DESC
    """ 

    curs.execute(popular_sql)

    for row in curs:
        print(f'row : {row}')
        popular_list.append(row)
    print(f'popular_list : {popular_list}')
    curs.execute(reasonable_sql)
    for row in curs:
        reasonable_list.append(row)

    curs.execute(high_ci_sql)
    for row in curs:
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        '인기순': popular_list,
        '가성비순' : reasonable_list,
        '치츄 높은순' : high_ci_list,
        '보험료 낮은 순' : cheap_list,
        '보장 높은 순' : high_coverage_list
    }
    return Response(data)


# 2차 검색
@api_view(['GET'])
def detail(request, gender, age, py):
    # 리스트에 담기 ?
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []
    
    # 필요한 기본 DB 정보
    host = "j6d206.p.ssafy.io" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor) 
    # http://127.0.0.1:8000/search/detail/30/2/10/
    # (1) 치츄 지수 높은 순
    high_ci_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(A.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(A.PRODUCT_OPTION) AS option_name
    FROM
    PRODUCT_OPTION A, 
    PRODUCT_RATE B,
    PRODUCT C,
    COMPANY D
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender} 
    AND B.PY = {py}
    GROUP BY chichu.B.TOTAL_INDEX
    ORDER BY B.TOTAL_INDEX DESC 
    """
    
    # (2) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(A.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(A.PRODUCT_OPTION) AS option_name
    FROM
    PRODUCT_OPTION A, 
    PRODUCT_RATE B,
    PRODUCT C,
    COMPANY D
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender} 
    AND B.PY = {py}
    GROUP BY chichu.B.RATE
    ORDER BY B.RATE
    """

    # (3) 보장금액 높은 순
    high_coverage_sql = f"""
    SELECT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
    ANY_VALUE(C.PRODUCT_NAME) as product_name,
    ANY_VALUE(D.COMPANY_CODE) as company_code,
    ANY_VALUE(D.COMPANY_NAME) as company_name,
    ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
    ANY_VALUE(B.RATE) as 'rate',
    GROUP_CONCAT(E.OPTION_CODE) AS option_code, 
    GROUP_CONCAT(E.PRODUCT_OPTION) AS option_name
    FROM ( 
        SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE 
        FROM PRODUCT_OPTION 
        GROUP BY PRODUCT_CODE 
        ) A, 
    PRODUCT_RATE B, 
    PRODUCT C,
    COMPANY D,
    PRODUCT_OPTION E
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
    AND B.PRODUCT_CODE = E.PRODUCT_CODE 
    AND B.PRODUCT_CODE = C.PRODUCT_CODE 
    AND C.COMPANY_CODE = D.COMPANY_CODE
    AND AGE = {age}
    AND GENDER = {gender} 
    AND PY = {py}
    GROUP BY chichu.A.COVERAGE
    ORDER BY A.COVERAGE DESC
    """ 

    curs.execute(high_ci_sql)
    for row in curs:
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        '치츄 높은순' : high_ci_list,
        '보험료 낮은 순' : cheap_list,
        '보장 높은 순' : high_coverage_list
    }
    return Response(data)


# 3  - 세부 보험 상품
@api_view(['GET'])
def product(request, product_code):
    product_code = get_object_or_404(Product, PRODUCT_CODE = product_code)
     

# 4 - 보험비교
@api_view(['GET'])
def compare(request, products):
    pass 