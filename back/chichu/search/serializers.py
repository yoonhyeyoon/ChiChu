from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.views.generic.base import RedirectView
from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, SearchCompany


# search를 사용하는 페이지 
# 1) 보험상품코드 (PRODUCT_CODE) 
# 2) 담보코드 (OPTION_CODE) PRODUCT TABLE
# 3) 회사로고 (COMPANY_LOGO) COMPANY TABLE
# 4) 보험상품명 (PRODUCT_NAME) PRODUCT TABLE
# 5) 설계유형 (SUBTYPE_CODE) PRODUCT TABLE 
# 6) 납입보험료 (RATE) PRODUCT_RATE TABLE


# 1. 검색결과
class DefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = ('__all__')


# 2. 상품비교
class CompareSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = '__all__'


# 3. 상품 상세 
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRate, Contract
        fields = '__all__'
