from django.db import models
from operators.models import Operator

class Sensor(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.type
        

class TestResult(models.Model):
    operator = models.ForeignKey(Operator, on_delete=models.CASCADE)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    testing_time = models.DateTimeField()
    is_success = models.BooleanField()
    

    def __str__(self):
        return f"Operator: {self.operator.name}, Sensor: {self.sensor.type}, Time: {self.testing_time}, Success: {self.is_success}"
    
