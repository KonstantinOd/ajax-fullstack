from rest_framework import serializers

class OperatorStatsSerializer(serializers.Serializer):
    name = serializers.CharField()
    total_success_tests = serializers.IntegerField()
    total_failure_tests = serializers.IntegerField()
