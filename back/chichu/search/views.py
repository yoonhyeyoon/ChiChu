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

     # 3. SQL문 작성
    # (1) 인기 상품 : 성별 + 연령 + [가장 많이 나온 상품 순서대로]
    # 해당 성별,연령에 따라 유저 지수 가장 높은 상품 6개 추천   
    popular_sql = f"SELECT PRODUCT_CODE FROM PRODUCT_RATE WHERE AGE = {age} AND GENDER = {gender} ORDER BY USER_INDEX DESC LIMIT 6;"

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]
    reasonable_sql = f"SELECT A.PRODUCT_CODE, C.PRODUCT_NAME FROM ( SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE FROM PRODUCT_OPTION GROUP BY PRODUCT_CODE ) A, PRODUCT_RATE B, PRODUCT C WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND B.PRODUCT_CODE = C.PRODUCT_CODE AND AGE = {age} AND GENDER = {gender} ORDER BY COVERAGE / (RATE * PY) DESC LIMIT 6"

    # (3) 치츄 지수 높은 순
    high_ci_sql = f"SELECT B.PRODUCT_CODE, TOTAL_INDEX FROM PRODUCT_RATE B, PRODUCT C WHERE B.PRODUCT_CODE = C.PRODUCT_CODE AND B.PY = 10 AND C.SUBTYPE_CODE = 1 AND B.AGE = {age} AND B.GENDER = {gender} ORDER BY TOTAL_INDEX DESC"
    
    # (4) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = f"SELECT PRODUCT_CODE FROM PRODUCT_RATE WHERE AGE = {age} AND GENDER ={gender} AND PY = 10 ORDER BY RATE"

    # (5) 보장금액 높은 순
    high_coverage_sql = f"SELECT A.PRODUCT_CODE FROM (SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE FROM PRODUCT_OPTION GROUP BY PRODUCT_CODE) A, PRODUCT_RATE B, PRODUCT C WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND B.PRODUCT_CODE = C.PRODUCT_CODE AND B.PY = 10 AND C.SUBTYPE_CODE = 1 AND B.AGE = {age} AND B.GENDER = {gender} ORDER BY COVERAGE DESC"

    curs.execute(popular_sql)
    for row in curs:
        popular_list.append(row)

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

    # serializer = ProductSerializer(product_code)
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
def detail(request, gender, age, period):

    # age = 19960225
    # gender = '여'
    # period = 10

    # 1. 나이 바꾸기
    age = change_age(age)

    # 2. 리스트에 담기 ?
    high_ci = []
    cheap = []
    high_coverage = []
    

    #필요한 기본 DB 정보
    host = "chichu" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db)
    # Connection 으로부터 Cursor 생성 
    curs = conn.cusor()


    # (1) 치츄 지수 높은 순
    high_ci_sql = """
    SELECT B.PRODUCT_CODE, TOTAL_INDEX
    FROM PRODUCT_RATE B
		 , PRODUCT C
    WHERE B.PRODUCT_CODE = C.PRODUCT_CODE
    AND B.PY = 10
    AND C.SUBTYPE_CODE = 1
    AND B.AGE = age 
    AND B.GENDER = gender
    ORDER BY TOTAL_INDEX DESC
    """
    
    # (2) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = """
    SELECT PRODUCT_CODE
    FROM PRODUCT_RATE 
    WHERE AGE = age
    AND GENDER = gender
    AND PY = 10
    ORDER BY RATE 
    """


    # (3) 보장금액 높은 순
    high_coverage_sql = """
    SELECT A.PRODUCT_CODE
    FROM (
            SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE 
            FROM PRODUCT_OPTION
            GROUP BY PRODUCT_CODE) A
            , PRODUCT_RATE B
            , PRODUCT C
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE
    AND B.PRODUCT_CODE = C.PRODUCT_CODE
    AND B.PY = 10
    AND C.SUBTYPE_CODE = 1
    AND B.AGE = age
    AND B.GENDER = gender
    ORDER BY COVERAGE DESC
    """

    curs.execute(high_ci_sql)
    curs.execute(cheap_sql)
    curs.execute(high_coverage_sql)
    
    high_ci_data = curs.fetchall()
    cheap_data = curs.fetchall()
    high_coverage_data = curs.fetchall()


    # serializer = DefaultSerializer(high_ci_data, cheap_data,high_coverage_data, many=True)
    # return Response(serializer.data)



# 3  - 세부 보험 상품
@api_view(['GET'])
def product(request, product_code):
    product_code = get_object_or_404(Product, PRODUCT_CODE = product_code)
     

# 4 - 보험비교
@api_view(['GET'])
def compare(request, products):
    pass 