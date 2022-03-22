import datetime
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import DBOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, UserContract, ProductContract


# 1차 검색
@api_view(['GET'])
def default(request, age, gender):
    # 1. 보험 나이로 바꾸기
    today = datetime.today().strftime("%Y%m%d")
    today_month = int(today[4:])
    user_birthday = age[4:]

    user_age = int(today) - int(age)

    if today_month > user_birthday:
        user_age + 1


    # 2. SQL 명령어로 성별, 연령에 맞춰 filter 1한 값 sql  27살, 여성이다.
    # PRODUCT_RATE.AGE == 'age' and PRODUCT_RATE.GENDER == 'gender' 인 product
    
    asap = []
    popular = []
    reasonable = []
    
    ''' SQL로 접근 
    1) 지금 당장 보장
    2) 해당 성별/연령에서 가장 인기 많은 순서
    3) 가성비가 좋은 (PRODUCT_OPTION > PRODUCT_CODE > SUM COVERAGE 크면서, 납입보험료 가장 낮은 순서로 최대 몇개?
    질문 1. 최대 몇개?
    질문 2. 가성비가 좋은 = 보장금액 COVERAGE SUM  250만원 / 월 보험료 5만원 * 가입기간 10년    ㅇㅇ
    질문 3. 보장금액 높은 순이 sum coverage일까요? 
    
    CSV 파일 넣어서 API 만들어보기 
    '''
    

    # 3)  ORDERBY 보험 상품 LIST 만들기  

    # 4) 성별, 연령, 기간 10년, 일반형 PRODUCT_RATE(PY == 10, PRODUCT(SUBTYPE_CODE == 1))
    chichu = []
    cheap = []
    coverage_up = []
    '''
    치츄지수 높은 순 
    보험료 낮은 순 
    보장금액 높은 순
    '''
    # 5)  ORDERBY 보험 상품 LIST 만들기

    # 6) 6가지 조건에 맞춰서 각 보험 상품에 대한 세부 정보들은 serializer에서 표시
    # movies = Movie.objects.filter(title__icontains=word)
    # serializer = MovieListSerializer(movies, many=True)
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


