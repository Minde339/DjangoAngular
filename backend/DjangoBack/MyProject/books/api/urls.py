from django.urls import path, include
from .views import BookViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('book', BookViewSet, basename='book')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>', include(router.urls)),
]