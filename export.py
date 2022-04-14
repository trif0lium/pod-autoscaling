import csv
import requests
import sys
import time
import os

PROMETHEUS = 'http://localhost:9090'
DATA = 'data/' + time.time()

def get_metrics():
    response = requests.get('{0}/api/v1/label/__name__/values'.format(PROMETHEUS))
    metrics = response.json()['data']
    return metrics

def write_csv_file(metric_name):
    response = requests.get('{0}/api/v1/query'.format(PROMETHEUS), params = {'query': metric_name + '[1h]' })
    results = response.json()['data']['result']

    labels = set()
    for result in results:
        label.update(result['metric'].keys())

    labels.discard('__name__')
    labels = sorted(labels)

    writer = csv.writer(sys.stdout)
    writer.writerow(['name', 'timestamp', 'value'] + labels)

    for result in results:
        l = [result['metric'].get('__name__', '')] + result['value']
        for label in labels:
            l.append(result['metric'].get(label, ''))
        writer.writerow(l)

os.makedirs(DATA, exist_ok = True)
