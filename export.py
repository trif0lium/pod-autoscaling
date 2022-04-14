import csv
import requests

PROMETHEUS = 'http://localhost:9090'

def get_metrics():
    response = requests.get('{0}/api/label/__name__/values'.format(PROMETHEUS))
    metrics = response.json()['data']
    return metrics
