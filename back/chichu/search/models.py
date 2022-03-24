# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Company(models.Model):
    company_code = models.CharField(db_column='COMPANY_CODE', primary_key=True, max_length=3)  # Field name made lowercase.
    company_name = models.CharField(db_column='COMPANY_NAME', max_length=50, blank=True, null=True)  # Field name made lowercase.
    company_index = models.FloatField(db_column='COMPANY_INDEX', blank=True, null=True)  # Field name made lowercase.
    non_payment_rate = models.FloatField(db_column='NON_PAYMENT_RATE', blank=True, null=True)  # Field name made lowercase.
    complaints = models.FloatField(db_column='COMPLAINTS', blank=True, null=True)  # Field name made lowercase.
    payment_period = models.FloatField(db_column='PAYMENT_PERIOD', blank=True, null=True)  # Field name made lowercase.
    delay_period = models.FloatField(db_column='DELAY_PERIOD', blank=True, null=True)  # Field name made lowercase.
    delay_rate = models.FloatField(db_column='DELAY_RATE', blank=True, null=True)  # Field name made lowercase.
    capital_ratio = models.FloatField(db_column='CAPITAL_RATIO', blank=True, null=True)  # Field name made lowercase.
    debt_ratio = models.TextField(db_column='DEBT_RATIO', blank=True, null=True)  # Field name made lowercase.
    net_asset = models.TextField(db_column='NET_ASSET', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'COMPANY'


class Contract(models.Model):
    contract_pk = models.IntegerField(db_column='CONTRACT_PK', primary_key=True)  # Field name made lowercase.
    user_code = models.ForeignKey('User', models.DO_NOTHING, db_column='USER_CODE')  # Field name made lowercase.
    gis_cd = models.CharField(db_column='GIS_CD', max_length=10, blank=True, null=True)  # Field name made lowercase.
    ct_py_amt = models.IntegerField(db_column='CT_PY_AMT', blank=True, null=True)  # Field name made lowercase.
    ct_py_pd = models.IntegerField(db_column='CT_PY_PD', blank=True, null=True)  # Field name made lowercase.
    ct_chnl_cd = models.CharField(db_column='CT_CHNL_CD', max_length=10, blank=True, null=True)  # Field name made lowercase.
    insu_day = models.IntegerField(db_column='INSU_DAY', blank=True, null=True)  # Field name made lowercase.
    insu_year = models.IntegerField(db_column='INSU_YEAR', blank=True, null=True)  # Field name made lowercase.
    mgg_grp = models.CharField(db_column='MGG_GRP', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CONTRACT'
        unique_together = (('contract_pk', 'user_code'),)


class DbOption(models.Model):
    option_code = models.CharField(db_column='OPTION_CODE', primary_key=True, max_length=5)  # Field name made lowercase.
    option_name = models.CharField(db_column='OPTION_NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    option_group_code = models.CharField(db_column='OPTION_GROUP_CODE', max_length=5, blank=True, null=True)  # Field name made lowercase.
    option_group_name = models.CharField(db_column='OPTION_GROUP_NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DB_OPTION'


class Product(models.Model):
    product_code = models.CharField(db_column='PRODUCT_CODE', primary_key=True, max_length=6)  # Field name made lowercase.
    company_code = models.ForeignKey(Company, models.DO_NOTHING, db_column='COMPANY_CODE')  # Field name made lowercase.
    product_name = models.CharField(db_column='PRODUCT_NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    product_link = models.CharField(db_column='PRODUCT_LINK', max_length=255, blank=True, null=True)  # Field name made lowercase.
    subtype_code = models.ForeignKey('ProductSubtype', models.DO_NOTHING, db_column='SUBTYPE_CODE')  # Field name made lowercase.
    user_index = models.TextField(db_column='USER_INDEX', blank=True, null=True)  # Field name made lowercase.
    company_index = models.TextField(db_column='COMPANY_INDEX', blank=True, null=True)  # Field name made lowercase.
    product_index = models.TextField(db_column='PRODUCT_INDEX', blank=True, null=True)  # Field name made lowercase.
    total_index = models.TextField(db_column='TOTAL_INDEX', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT'
        unique_together = (('product_code', 'company_code', 'subtype_code'),)


class ProductOption(models.Model):
    option_pk = models.IntegerField(db_column='OPTION_PK', primary_key=True)  # Field name made lowercase.
    product_code = models.ForeignKey(Product, models.DO_NOTHING, db_column='PRODUCT_CODE')  # Field name made lowercase.
    product_option = models.TextField(db_column='PRODUCT_OPTION', blank=True, null=True)  # Field name made lowercase.
    option_code = models.ForeignKey(DbOption, models.DO_NOTHING, db_column='OPTION_CODE')  # Field name made lowercase.
    coverage = models.IntegerField(db_column='COVERAGE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT_OPTION'
        unique_together = (('option_pk', 'option_code', 'product_code'),)


class ProductRate(models.Model):
    product_rate_pk = models.IntegerField(db_column='PRODUCT_RATE_PK', primary_key=True)  # Field name made lowercase.
    product_code = models.ForeignKey(Product, models.DO_NOTHING, db_column='PRODUCT_CODE')  # Field name made lowercase.
    age = models.IntegerField(db_column='AGE', blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='GENDER', max_length=10, blank=True, null=True)  # Field name made lowercase.
    rate = models.IntegerField(db_column='RATE', blank=True, null=True)  # Field name made lowercase.
    py = models.IntegerField(db_column='PY', blank=True, null=True)  # Field name made lowercase.
    gy = models.IntegerField(db_column='GY', blank=True, null=True)  # Field name made lowercase.
    sd = models.IntegerField(db_column='SD', blank=True, null=True)  # Field name made lowercase.
    mr = models.IntegerField(db_column='MR', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT_RATE'
        unique_together = (('product_rate_pk', 'product_code'),)


class ProductSubtype(models.Model):
    subtype_code = models.CharField(db_column='SUBTYPE_CODE', primary_key=True, max_length=10)  # Field name made lowercase.
    subtype_name = models.CharField(db_column='SUBTYPE_NAME', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCT_SUBTYPE'


class User(models.Model):
    user_code = models.CharField(db_column='USER_CODE', primary_key=True, max_length=10)  # Field name made lowercase.
    bth_yr = models.IntegerField(db_column='BTH_YR', blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='GENDER', max_length=10, blank=True, null=True)  # Field name made lowercase.
    age = models.IntegerField(db_column='AGE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'USER'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class SearchCompany(models.Model):
    id = models.BigAutoField(primary_key=True)
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

    class Meta:
        managed = False
        db_table = 'search_company'


class SearchContract(models.Model):
    id = models.BigAutoField(primary_key=True)
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

    class Meta:
        managed = False
        db_table = 'search_contract'


class SearchDboption(models.Model):
    id = models.BigAutoField(primary_key=True)
    option_code = models.TextField()
    option_name = models.TextField()
    option_group_code = models.TextField()
    option_group_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'search_dboption'


class SearchProduct(models.Model):
    id = models.BigAutoField(primary_key=True)
    product_code = models.TextField()
    product_name = models.TextField()
    product_link = models.TextField()
    user_index = models.FloatField()
    company_index = models.FloatField()
    product_index = models.FloatField()
    total_index = models.FloatField()
    company_code = models.ForeignKey(SearchCompany, models.DO_NOTHING)
    subtype_code = models.ForeignKey('SearchProductsubtype', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'search_product'


class SearchProductcontract(models.Model):
    id = models.BigAutoField(primary_key=True)
    pc_pk = models.IntegerField()
    company_code = models.ForeignKey(SearchCompany, models.DO_NOTHING)
    contract_pk = models.ForeignKey(SearchContract, models.DO_NOTHING)
    product_code = models.ForeignKey(SearchProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'search_productcontract'


class SearchProductoption(models.Model):
    id = models.BigAutoField(primary_key=True)
    option_pk = models.IntegerField()
    product_option = models.TextField()
    coverage = models.IntegerField()
    option_code = models.ForeignKey(SearchDboption, models.DO_NOTHING)
    product_code = models.ForeignKey(SearchProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'search_productoption'


class SearchProductrate(models.Model):
    id = models.BigAutoField(primary_key=True)
    product_rate_pk = models.IntegerField()
    age = models.IntegerField()
    gender = models.IntegerField()
    py = models.IntegerField()
    gy = models.IntegerField()
    sd = models.IntegerField()
    mr = models.IntegerField()
    rate = models.IntegerField()
    product_code = models.ForeignKey(SearchProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'search_productrate'


class SearchProductsubtype(models.Model):
    id = models.BigAutoField(primary_key=True)
    subtype_code = models.TextField()
    subtype_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'search_productsubtype'


class SearchUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_code = models.TextField()
    bth_yr = models.IntegerField()
    gender = models.TextField()
    age = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'search_user'


class SearchUsercontract(models.Model):
    id = models.BigAutoField(primary_key=True)
    uc_pk = models.IntegerField()
    contract_pk = models.ForeignKey(SearchContract, models.DO_NOTHING)
    user_code = models.ForeignKey(SearchUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'search_usercontract'
