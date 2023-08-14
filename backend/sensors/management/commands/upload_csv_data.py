import os
import requests
import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from sensors.models import Sensor, TestResult
from operators.models import Operator

class Command(BaseCommand):
    help = 'Upload data from remote CSV file to existing tables'

    def handle(self, *args, **options):
        csv_url = os.environ.get('CSV_URL')

        if not csv_url:
            self.stdout.write(self.style.ERROR('CSV_URL environment variable is not set.'))
            return

        # Download the CSV file
        response = requests.get(csv_url)
        if response.status_code == 200:
            csv_data = response.content.decode('utf-8')
            csv_reader = csv.DictReader(csv_data.splitlines())

            for row in csv_reader:
                sensor_type = row['Device type']
                operator_name = row['Operator']
                test_time = datetime.strptime(row['Time'], '%Y-%m-%d %H:%M:%S')
                is_success = row['Success'].lower() == 'true'

                sensor, created = Sensor.objects.get_or_create(type=sensor_type)
                operator, created = Operator.objects.get_or_create(name=operator_name)
                TestResult.objects.create(sensor=sensor, operator=operator, testing_time=test_time, is_success=is_success)

            self.stdout.write(self.style.SUCCESS('CSV data uploaded successfully.'))
        else:
            self.stdout.write(self.style.ERROR(f'Failed to fetch CSV data. Status code: {response.status_code}'))
