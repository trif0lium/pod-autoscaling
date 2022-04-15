import csv
import requests
import sys
import time
from datetime import datetime, timedelta
import os

PROMETHEUS = 'http://localhost:9090'
DATA = 'data/' + str(round(time.time() * 1000))

def get_metrics():
    response = requests.get('{0}/api/v1/label/__name__/values'.format(PROMETHEUS))
    metrics = response.json()['data']
    return metrics

def query(metric_name):
    now = datetime.now()
    start = now - timedelta(hours=1)
    end = now + timedelta(hours=1)

    response = requests.get('{0}/api/v1/query'.format(PROMETHEUS), params = {
        'query': metric_name + '[2d]',
    })

    return response.json()

def write_json_file(metric_name, file):
    results = query(metric_name)
    file.write(results)

def write_csv_file(metric_name, file):
    results = query(metric_name)['data']['result']

    labels = set()
    for result in results:
        labels.update(result['metric'].keys())

    labels.discard('__name__')
    labels = sorted(labels)

    writer = csv.writer(file)
    writer.writerow(['name', 'timestamp', 'value'] + labels)

    for result in results:
        l = [result['metric'].get('__name__', '')] + result['values']
        for label in labels:
            l.append(result['metric'].get(label, ''))
        writer.writerow(l)

os.makedirs(DATA, exist_ok = True)
for metric in get_metrics():
    if not metric.startswith('api_') and not metric.startswith('container_'):
        continue

    file = os.path.join(DATA, metric + '.csv')
    with open(file, mode = 'w') as _file:
        write_csv_file(metric, _file)

    json_file = os.path.join(DATA, metric + '.json')
    with open(json_file, mode = 'w') as _file:
        write_json_file(metric, _file)
