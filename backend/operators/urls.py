from django.urls import include, path
from rest_framework import routers

from .views import OperatorStatsView


router = routers.DefaultRouter()
router.register(r"operators-stat", OperatorStatsView)

urlpatterns = [
    path("", include(router.urls)),
]
