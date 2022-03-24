from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.views.generic.base import RedirectView
from .models import DbOption, Company, ProductSubtype, Product, ProductOption, ProductRate, Contract, User, SearchCompany


# search를 사용하는 페이지 :
# 1. 검색결과
# 2. 상품비교
# 3. 검색결과 상세페이지


# 1. 검색결과
# 1-1. 보험상품코드 
# 2) 담보코드
# 3) 회사로고
# 4) 보험상품명
# 5) 설계유형
# 6) 납입보험료 


class Comment(object):
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.datetime.now()

comment = Comment(email='leila@example.com', content='foo bar')


class Default(serializers.ModelSerializer):

    class Meta1:
        model = Company
        fields = ('')
    
    class Meta2:
        model = Company
        fields = ('')
