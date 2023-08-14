from rest_framework import serializers

class SensorStatsSerializer(serializers.Serializer):
    type = serializers.CharField()
    total_success_tests = serializers.IntegerField()
    total_failure_tests = serializers.IntegerField()
