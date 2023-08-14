from django.urls import include, path
from rest_framework import routers

from .views import SensorStatsView


router = routers.DefaultRouter()
router.register(r"stat", SensorStatsView)

urlpatterns = [
    path("", include(router.urls)),
]
