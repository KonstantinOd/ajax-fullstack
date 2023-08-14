from django.contrib import admin
from .models import Sensor, TestResult

# Register your models here.

admin.site.register(Sensor)
admin.site.register(TestResult)