from django.urls import path
from . import views

app_name = 'search'

urlpatterns = [
    # 1차 검색
    path('default/<int:age>/<str:gender>/', views.default),
    # 2차 검색
    path('detail/<int:age>/<str:gender>/<int:period>/', views.detail),
    # 세부보험 
    path('product/<str:product_code>/', views.product),
    # 보험 비교
    path('compare/', views.compare),
]