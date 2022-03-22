from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.views.generic.base import RedirectView
from .models import DBOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, UserContract, ProductContract


'''
1) 보험상품코드
2) 담보코드
3) 회사로고
4) 보험상품명
5) 설계유형
6) 납입보험료 
'''

class Default(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('')
