from rest_framework import viewsets
from django.db.models import Count, Case, When, IntegerField, Q
from rest_framework.response import Response

from .models import Sensor
from .serializers import SensorStatsSerializer


class SensorStatsView(viewsets.ReadOnlyModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorStatsSerializer
    
    def list(self, request, *args, **kwargs):
        operator = request.query_params.get('operator')

        operator_filter = Q(testresult__operator__name=operator) if operator else Q()
        self.queryset = self.queryset.annotate(
            total_success_tests=Count(
                Case(When(Q(testresult__is_success=True) & operator_filter, then=1), output_field=IntegerField())
            ),
            total_failure_tests=Count(
                Case(When(Q(testresult__is_success=False) & operator_filter, then=1), output_field=IntegerField())
            )
        )

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

