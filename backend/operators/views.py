from rest_framework import viewsets
from django.db.models import Count, Case, When, IntegerField, Q
from rest_framework.response import Response

from .models import Operator
from .serializers import OperatorStatsSerializer


class OperatorStatsView(viewsets.ReadOnlyModelViewSet):
    queryset = Operator.objects.all()
    serializer_class = OperatorStatsSerializer
    
    def list(self, request, *args, **kwargs):
        sensor_type = request.query_params.get('sensor_type')

        sensor_filter = Q(testresult__sensor__type=sensor_type) if sensor_type else Q()
        self.queryset = self.queryset.annotate(
            total_success_tests=Count(
                Case(When(Q(testresult__is_success=True) & sensor_filter, then=1), output_field=IntegerField())
            ),
            total_failure_tests=Count(
                Case(When(Q(testresult__is_success=False) & sensor_filter, then=1), output_field=IntegerField())
            )
        )
        
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


