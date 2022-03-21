from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import DBOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, UserContract, ProductContract


'''
1) 보험상품코드
2) 담보코드
3) 회사 로고 
4) 보험상품명
5) 설계유형
6) 납입보험료
7) total_index 치츄
8) product_rate > rate
9) coverage sum 
보험료순
보장금액
보장금액
3가지 기준별 높은 순
'''

# 1차 검색
@api_view(['GET'])
def default(request):
    pass 

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


