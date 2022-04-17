import http from 'k6/http'
import { sleep } from 'k6'

function targetNumberOfVUs(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.ceil(Math.floor(Math.random() * (max - min + 1) + min)) * 5
}

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: true,
  stages: [
    // 00:00 - 08:00
    { duration: '8m', target: targetNumberOfVUs(0, 5) },
    { duration: '8m', target: targetNumberOfVUs(0, 5) },
    { duration: '8m', target: targetNumberOfVUs(0, 5) },
    { duration: '8m', target: targetNumberOfVUs(5, 12) },
    // 08:00 - 12:00
    { duration: '8m', target: targetNumberOfVUs(5, 12) },
    { duration: '8m', target: targetNumberOfVUs(12, 15) },
    // 12:00 - 16.00
    { duration: '8m', target: targetNumberOfVUs(25, 30) },
    { duration: '8m', target: targetNumberOfVUs(25, 30) },
    // 16:00 - 22.00
    { duration: '8m', target: targetNumberOfVUs(12, 15) },
    { duration: '8m', target: targetNumberOfVUs(12, 15) },
    { duration: '8m', target: targetNumberOfVUs(5, 12) },
    // 22:00 - 00.00
    { duration: '8m', target: targetNumberOfVUs(5, 12) },
  ]
}

export default function() {
  http.get('http://api.default.svc.cluster.local:1323')
  sleep(1)
}
