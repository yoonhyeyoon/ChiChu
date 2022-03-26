from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.views.generic.base import RedirectView
from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, SearchCompany


# search를 사용하는 페이지 
# 1) 보험상품코드 (product_code) 
# 2) 담보 코드 (OPTION_CODE)        PRODUCT TABLE
# 3) 담보 코드 이름 (OPTION_NAME)   PRODUCT TABLE 
# 4) 회사코드 (COMPANY_CODE)        COMPANY TABLE
# 5) 회사이름 (COMPANY_NAME)        COMPANY TABLE
# 6) 보험상품명 (PRODUCT_NAME)      PRODUCT TABLE
# 7) 설계유형 (SUBTYPE_CODE)        PRODUCT TABLE 
# 8) 납입보험료 (RATE)              PRODUCT_RATE TABLE


# 1. 검색결과
# (1) 유저지수 높은 순
class PopularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product, ProductRate, Company, DbOption
        fields = ('__all__')

# (2) 가성비 높은 순 
class ReasonableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product, ProductRate, Company, DbOption
        fields = ('__all__')

# (3) 치츄지수 높은 순
class ChichuIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product, ProductRate, Company, DbOption
        fields = ('__all__')

# (4) 보험료 낮은 순
class CheapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product, ProductRate, Company, DbOption
        fields = ('__all__')

# (5) 보장 높은 순
class CoverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product, ProductRate, Company, DbOption
        fields = ('__all__')
