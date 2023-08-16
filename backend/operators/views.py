from datetime import datetime, timedelta
from django.utils import timezone
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
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        sensor_filter = Q(testresult__sensor__type=sensor_type) if sensor_type else Q()
        date_filter = Q()

        if start_date:
            start_date = datetime.strptime(start_date, '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
            date_filter &= Q(testresult__testing_time__gte=start_date)
            
        if end_date:
            end_date = datetime.strptime(end_date, '%Y-%m-%dT%H:%M:%S.%fZ').replace(tzinfo=timezone.utc)
            date_filter &= Q(testresult__testing_time__lte=end_date)

        # Ensure the difference between start_date and end_date is less than 2 weeks
        if start_date and end_date:
            if (end_date - start_date) > timedelta(weeks=2):
                return Response({"detail": "Date range exceeds 2 weeks."}, status=400)

        self.queryset = self.queryset.annotate(
            total_success_tests=Count(
                Case(When(Q(testresult__is_success=True) & sensor_filter & date_filter, then=1), output_field=IntegerField())
            ),
            total_failure_tests=Count(
                Case(When(Q(testresult__is_success=False) & sensor_filter & date_filter, then=1), output_field=IntegerField())
            )
        )
        
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


