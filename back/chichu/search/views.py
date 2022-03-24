from datetime import datetime
from email.mime import application
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from django.shortcuts import get_object_or_404
import pymysql

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chichu.settings")

import django
django.setup()


from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User


# 1차 검색
@api_view(['GET'])
def default(request):
    #필요한 기본 DB 정보
    host = "chichu" #접속할 db의 host명
    user = "chichu" #접속할 db의 user명
    pw = "ssafy" #접속할 db의 password
    db = "chichu" #접속할 db의 table명 (실제 데이터가 추출되는 table)

    #DB에 접속
    conn = pymysql.connect( host= host, user = user, password = pw, db = db)
    # Connection 으로부터 Cursor 생성 
    curs = conn.cusor()


    # 1. 사용자 나이를 보험 나이로 바꾸기
    age = 19960225
    user_gender = '여'
    today = datetime.today().strftime("%Y%m%d")
    today_month = int(today[4:])
    user_birthday = age[4:]

    user_age = int(today) - int(age)
    if today_month > user_birthday:
        user_age + 1
    
    if user_age % 10 >=5:
        user_age = (user_age // 10) * 10 + 5
    else:
        user_age = (user_age // 10) * 10

    # 2. 리스트에 담기
    # 2-1. (선택) :성별, 연령  
    #       (필수) : 납입기간 10년/ 보험기간 10년/ 기본보장 -> 가장 인기있는(popular) / 가성비 있는(resonable)
    popular = []               
    reasonable = []
    # 2-2. (선택) :성별, 연령  -> 치츄 높은순(high_ci) / 보험료 낮은순 (cheap) / 보장금액 높은순(high_coverage)
    high_ci = []
    cheap = []
    high_coverage = []
    
    

    # 3. SQL문 작성

    # (1) 인기 상품 : 성별 + 연령 + [가장 많이 나온 상품 순서대로]
    popular_sql = """
    """

    # (2) 가성비 : 성별 + 연령 + [보장금액 COVERAGE SUM / 월 보험료  * 가입기간 ]
    reasonable_sql = """
    SELECT A.PRODUCT_CODE
    FROM (
    SELECT PRODUCT_CODE, SUM(COVERAGE) AS COVERAGE 
    FROM PRODUCT_OPTION
    GROUP BY PRODUCT_CODE )
    A, PRODUCT_RATE B
    WHERE A.PRODUCT_CODE = B.PRODUCT_CODE
    AND AGE = 30 
    AND GENDER = '여'
    ORDER BY COVERAGE / (RATE * PY) DESC
    LIMIT 6
    """   

    # (3) 치츄 지수 높은 순
    high_ci_sql = """
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
    AND B.AGE = 30 
    AND B.GENDER = '여'
    ORDER BY RATE
    LIMIT 6
    """
    
    # (4) 보험료 낮은 순
    cheap_sql = """
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
    AND B.AGE = 30 
    AND B.GENDER = '여'
    ORDER BY RATE
    LIMIT 6
    """


    # (5) 보장금액 높은 순
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
    AND B.AGE = 30 
    AND B.GENDER = '여'
    ORDER BY COVERAGE DESC
    LIMIT 6
    """

    curs.execute(popular_sql)
    curs.execute(reasonable_sql)
    curs.execute(high_ci_sql)
    curs.execute(cheap_sql)
    curs.execute(high_coverage_sql)

    # 5. 데이타 Fetch
    popular_data = curs.fetchall()
    reasonable_data = curs.fetchall()
    high_ci_data = curs.fetchall()
    cheap_data = curs.fetchall()
    high_coverage_data = curs.fetchall()


    # 5. db 접속 종료
    curs.close()
    conn.close()


    # 6. 5가지 조건에 맞춰서 각 보험 상품에 대한 세부 정보들은 serializer에서 표시
    # serializer = ProductSerializer( many=True)
    # return Response(serializer.data)


# 2차 검색
@api_view(['GET'])
def detail(request):
    
    
    
    pass

# 세부 보험 상품
@api_view(['GET'])
def product(request):
    pass 

# 보험비교
@api_view(['GET'])
def compare(request):
    pass 


