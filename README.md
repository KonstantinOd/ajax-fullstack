## Completed tasks
- Created Django app
- Created 3 tables (Sensor, Operator, TestResult) in the sqlite db.
- Created Django command to load data from the csv file into a db
- Developed an api ```api_v1/stat?operator=name, api_v1/operators-stat?sensor_type=type``` to get statistics.
- Created react + typescript app
- Created a bootstrap table to display sensors statistics and a nested table to display operators statistics depends on sensor type. 
- Created a bootstrap table to display operators statistics and a nested table to display sensors statistics depends on operator name. 

- Added filters by date in the range of no more than 2 weeks
- Added total_tests, total_success, total_failure under the main Sensor and Operator Statisctics tables. 


## Backend app

Create an .env file in the backend folder and add the CSV_URL=path/to/remote.csv.
Don't forget to change the url. 

```sh
cd backend

python3 -m venv env
source env/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py upload_csv_data 
python manage.py runserver
```

## Frontend app

```sh
cd frontend

npm i
npm start
```
