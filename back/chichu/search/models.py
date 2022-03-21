from calendar import c
from django.db import models
from django.conf import settings
from django.forms import IntegerField
# Create your models here.

class DBOption(models.Model):
    option_code = models.TextField()
    option_name = models.TextField()
    option_group_code = models.TextField()
    option_group_name = models.TextField()

    def __str__(self):
        return self.option_name

class Company(models.Model):
    company_code = models.TextField()
    company_name = models.TextField()
    company_index = models.IntegerField()
    non_payment_rate = models.FloatField()
    complaints = models.FloatField()
    payment_period = models.FloatField()
    delay_period = models.FloatField()
    delay_rate = models.FloatField()
    capital_ratio = models.FloatField()
    debt_ratio = models.FloatField()
    net_asset = models.FloatField()

    def __str__(self):
        return self.company_name

class ProductSubtype(models.Model):
    subtype_code = models.TextField()
    subtype_name = models.TextField()

    def __str__(self):
        return self.subtype_name


class Product(models.Model):
    product_code = models.TextField()
    company_code = models.ForeignKey(Company, on_delete=models.CASCADE)
    subtype_code = models.ForeignKey(ProductSubtype, on_delete=models.CASCADE)
    product_name = models.TextField()
    product_link = models.TextField()
    user_index = models.FloatField()
    company_index = models.FloatField()
    product_index = models.FloatField()
    total_index = models.FloatField()


class ProductOption(models.Model):
    option_pk = models.IntegerField()
    option_code = models.ForeignKey(DBOption, on_delete=models.CASCADE)
    product_code = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_option = models.TextField()
    coverage = models.IntegerField()


# 납입보험료
class ProductRate(models.Model):
    product_rate_pk = models.IntegerField()
    product_code = models.ForeignKey(Product, on_delete=models.CASCADE)
    age = models.IntegerField()
    gender = models.IntegerField()
    py = models.IntegerField()
    gy = models.IntegerField()
    sd = models.IntegerField()
    mr = models.IntegerField()
    rate = models.IntegerField()


class Contract(models.Model):
    contract_pk = models.IntegerField()
    gis_cd = models.TextField()
    ct_py_amt = models.IntegerField()
    ct_py_cycle_cd = models.TextField()
    ct_py_pd = models.IntegerField()
    ct_chnl_cd = models.TextField()
    insu_day = models.IntegerField()
    insu_year = models.IntegerField()
    mgg_grp = models.TextField()
    mgg_cd = models.TextField()
    mgg_cnt = models.IntegerField()
    mgg_amt = models.IntegerField()


class User(models.Model):
    user_code = models.TextField()
    bth_yr = models.IntegerField()
    gender = models.TextField()
    age = models.IntegerField()

class UserContract(models.Model):
    uc_pk = models.IntegerField()
    contract_pk = models.ForeignKey(Contract, on_delete=models.CASCADE)
    user_code = models.ForeignKey(User, on_delete=models.CASCADE)

class ProductContract(models.Model):
    pc_pk = models.IntegerField()
    contract_pk = models.ForeignKey(Contract, on_delete=models.CASCADE)
    product_code = models.ForeignKey(Product, on_delete=models.CASCADE)
    company_code = models.ForeignKey(Company, on_delete=models.CASCADE)
