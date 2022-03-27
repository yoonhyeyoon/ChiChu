from datetime import datetime
from email.mime import application
# from h11 import PRODUCT_ID
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import pymysql
import json

# import os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chichu.settings")

# import django
# django.setup()

from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User
from .serializers import (
    PopularSerializer, ReasonableSerializer, ChichuIndexSerializer, CheapSerializer, CoverageSerializer )

# 나이바꾸기 함수
def change_age(age):
    if age <= 20:
        return 20
    elif 20 < age <= 25:
        return 25
    elif 25 < age <= 30:
        return 30
    elif 30 < age <= 35:
        return 35
    elif 35 < age <= 40:
        return 40
    elif 40 < age <= 45:
        return 45
    elif 50 < age <= 55:
        return 55
    elif 55 < age <= 60:
        return 60
    elif 60 < age <= 65:
        return 65
    elif 65 < age <= 70:
        return 70

# 1 - 1차 검색
@api_view(['GET'])
def default(request, age, gender):
    popular_list = []
    reasonable_list = []
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []

    # 사용자 나이 바꾸기
    age = change_age(age)    

    # 필요한 기본 DB 정보
    host = "j6d206.p.ssafy.io" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor)

    
     # 3. SQL문 작성
    # (1) 인기 상품 : 성별 + 연령 + 유저지수 가장 높은 상품 순서대로
    popular_sql =f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.USER_INDEX as user_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.USER_INDEX) as user_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = 10
        ) G
    GROUP BY chichu.G.USER_INDEX
    ORDER BY chichu.G.USER_INDEX DESC 
    LIMIT 6;
    """

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]

    reasonable_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE / (B.PY * B.RATE)) as reasonable,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(B.PY) as py,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        AND PY = 10
        ORDER BY reasonable DESC
        LIMIT 6;
    """


    # (3) 치츄 지수 높은 순
    high_ci_sql = f"""
        SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = 10
        ) G
    GROUP BY chichu.G.TOTAL_INDEX
    ORDER BY chichu.G.TOTAL_INDEX DESC 
    LIMIT 6;
    """
    
    # (4) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND AGE = 30
            AND GENDER = 2
        ) G
    GROUP BY chichu.G.RATE
    ORDER BY chichu.G.RATE 
    LIMIT 6;
    """

    # (5) 보장금액 높은 순
    high_coverage_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE) as coverage,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        ORDER BY COVERAGE DESC
    """ 

    curs.execute(popular_sql)
    for row in curs:
<<<<<<< HEAD
        popular_list.append(row)
=======
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        popular_list.append(row)
    
>>>>>>> feature/BE/Server

    curs.execute(reasonable_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        reasonable_list.append(row)

    curs.execute(high_ci_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        'popular': popular_list,
        'reasonable' : reasonable_list,
        'chichu' : high_ci_list,
        'cheap' : cheap_list,
        'coverage' : high_coverage_list
    }
    return Response(data)


# 2차 검색
@api_view(['GET'])
def detail(request, gender, age, py):
    # 리스트에 담기 ?
    high_ci_list = []
    cheap_list = []
    high_coverage_list = []
    
    age = change_age(age)   

    # 필요한 기본 DB 정보
    host = "j6d206.p.ssafy.io" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db, charset="utf8")
    # Connection 으로부터 Cursor 생성 > dictionary 형태로 만들기
    curs = conn.cursor(pymysql.cursors.DictCursor) 

    # (1) 치츄 지수 높은 순
    high_ci_sql = f"""
        SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.TOTAL_INDEX as total_index,
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name,
            ANY_VALUE(B.TOTAL_INDEX) as total_index
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = {py}
        ) G
    GROUP BY chichu.G.TOTAL_INDEX
    ORDER BY chichu.G.TOTAL_INDEX DESC 
    LIMIT 6;
    """
    
    # (2) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"""
    SELECT 
        G.PRODUCT_CODE AS product_code,
        G.PRODUCT_NAME as product_name, 
        G.COMPANY_CODE AS company_code,
        G.COMPANY_NAME AS company_name,
        G.SUBTYPE_CODE as subtype_code,
        G.RATE AS rate,
        GROUP_CONCAT(G.option_code) AS option_code, 
        GROUP_CONCAT(G.option_name) AS option_name
        FROM ( SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
            ANY_VALUE(C.PRODUCT_NAME) as product_name,
            ANY_VALUE(D.COMPANY_CODE) as company_code,
            ANY_VALUE(D.COMPANY_NAME) as company_name,
            ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
            ANY_VALUE(B.RATE) as rate,
            ANY_VALUE(E.OPTION_CODE) as option_code,
            ANY_VALUE(E.OPTION_NAME) as option_name
            FROM
            PRODUCT_OPTION A, 
            PRODUCT_RATE B,
            PRODUCT C,
            COMPANY D,
            DB_OPTION E
            WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
            AND B.PRODUCT_CODE = C.PRODUCT_CODE
            AND C.COMPANY_CODE = D.COMPANY_CODE
            AND A.OPTION_CODE = E.OPTION_CODE
            AND AGE = {age}
            AND GENDER = {gender}
            AND PY = {py}
        ) G
    GROUP BY chichu.G.RATE
    ORDER BY chichu.G.RATE 
    LIMIT 6;
    """

    # (3) 보장금액 높은 순
    high_coverage_sql = f"""
    SELECT DISTINCT ANY_VALUE(A.PRODUCT_CODE) AS product_code, 
        ANY_VALUE(A.COVERAGE) as coverage,
        ANY_VALUE(C.PRODUCT_NAME) as product_name,
        ANY_VALUE(D.COMPANY_CODE) as company_code,
        ANY_VALUE(D.COMPANY_NAME) as company_name,
        ANY_VALUE(C.SUBTYPE_CODE) as subtype_code,
        ANY_VALUE(B.RATE) as rate,
        ANY_VALUE(A.OPTION_CODE) as option_code,
        ANY_VALUE(A.OPTION_NAME) as option_name
        FROM
            ( SELECT PRODUCT_CODE, GROUP_CONCAT(OPTION_CODE) AS OPTION_CODE, GROUP_CONCAT(OPTION_NAME) AS OPTION_NAME, 
                SUM(COVERAGE) AS COVERAGE FROM (
                SELECT P.PRODUCT_CODE, P.OPTION_CODE, O.OPTION_NAME, P.COVERAGE
                FROM PRODUCT_OPTION P, DB_OPTION O
                WHERE P.OPTION_CODE = O.OPTION_CODE
                )
        PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, 
        PRODUCT_RATE B,
        PRODUCT C,
        COMPANY D
        WHERE A.PRODUCT_CODE = B.PRODUCT_CODE 
        AND B.PRODUCT_CODE = C.PRODUCT_CODE
        AND C.COMPANY_CODE = D.COMPANY_CODE
        AND AGE = {age}
        AND GENDER = {gender}
        AND PY = {py}
        ORDER BY COVERAGE DESC
    """ 

    curs.execute(high_ci_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_ci_list.append(row)

    curs.execute(cheap_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        cheap_list.append(row)

    curs.execute(high_coverage_sql)
    for row in curs:
        row['option_code'] = row['option_code'].split(',')
        row['option_name'] = row['option_name'].split(',')
        high_coverage_list.append(row)

    # db 접속 종료
    curs.close()
    conn.close()

    data = {
        'chichu' : high_ci_list,
        'cheap' : cheap_list,
        'coverage' : high_coverage_list
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