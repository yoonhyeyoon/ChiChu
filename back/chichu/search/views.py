from datetime import datetime
from email.mime import application
from h11 import PRODUCT_ID
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from django.shortcuts import get_object_or_404
import pymysql

# import os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chichu.settings")

# import django
# django.setup()

from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User
from .serializers import (
    DefaultSerializer, ProductSerializer
    )

# 1. 사용자 나이를 보험 나이로 바꾸기
def change_age(age):
    today = datetime.today().strftime("%Y%m%d")
    user_age = int(today) - int(age)

    # 생일 지났는지 안지났는지 확인
    today_month = int(today[4:])
    user_birthday = age[4:]

    if today_month > user_birthday:
        user_age + 1
    
    # 5단위로 나이 맞추기 
    if user_age <= 20:
        return 20
    elif 20 < user_age <= 25:
        return 25
    elif 25 < user_age <= 30:
        return 30
    elif 30 < user_age <= 35:
        return 35   
    elif 35 < user_age <= 40:
        return 40
    elif 40 < user_age <= 45:
        return 45
    elif 45 < user_age <= 50:
        return 50            
    elif 50 < user_age <= 55:
        return 55
    elif 55 < user_age <= 60:
        return 60
    elif 60 < user_age <= 65:
        return 65               
    elif 65 < user_age <= 70:
        return 70
    elif 70 < user_age <= 75:
        return 75
    elif 75 < user_age <= 80:
        return 80   

# 1 - 1차 검색
@api_view(['GET'])
def default(request, age, gender):

    # 예시
    age = 19960225
    gender = '여'
    
    # 1. 나이 바꾸기
    age = change_age(age)

    # 2. 리스트에 담기
    # 2-1. (선택) :성별, 연령  
    #       (필수) : 납입기간 10년/ 보험기간 10년/ 기본보장 -> 가장 인기있는(popular) / 가성비 있는(resonable)
    popular = []               
    reasonable = []
    # 2-2. (선택) :성별, 연령  -> 치츄 높은순(high_ci) / 보험료 낮은순 (cheap) / 보장금액 높은순(high_coverage)
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
    SELECT B.PRODUCT_CODE, TOTAL_INDEX
    FROM PRODUCT_RATE B
		 , PRODUCT C
    WHERE B.PRODUCT_CODE = C.PRODUCT_CODE
    AND B.PY = 10
    AND C.SUBTYPE_CODE = 1
    AND B.AGE = 30 
    AND B.GENDER = '여'
    ORDER BY TOTAL_INDEX DESC
    """
    
    # (4) 보험료 낮은 순 [성별, 나이, py 10, 일반형]
    cheap_sql = """
    SELECT PRODUCT_CODE
    FROM PRODUCT_RATE 
    WHERE AGE = 30
    AND GENDER ='여' 
    AND PY = 10 
    ORDER BY RATE 
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
    serializer = DefaultSerializer(popular_data,reasonable_data,high_ci_data, cheap_data,high_coverage_data, many=True)
    return Response(serializer.data)



# 2차 검색
@api_view(['GET'])
def detail(request, gender, age):

    age = 19960225
    gender = '여'

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


    serializer = DefaultSerializer(high_ci_data, cheap_data,high_coverage_data, many=True)
    return Response(serializer.data)



# 3  - 세부 보험 상품
@api_view(['GET'])
def product(request, product_code):
    # 세부 보험 상품 
    product_code = get_object_or_404(Product, PRODUCT_CODE = product_code)
    serializer = ProductSerializer(product_code)
    return Response(serializer.data)
     

# 4 - 보험비교
@api_view(['GET'])
def compare(request, products):
    # for i in products:
    #     i = get_object_or_404(Product, PRODUCT_CODE = i) ? 흑흑 모르겟다
    # 선택된 보험들에 대한 사항들
    pass 