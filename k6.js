import http from 'k6/http'
import { sleep } from 'k6'

function targetNumberOfVUs(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.ceil(Math.floor(Math.random() * (max - min + 1) + min)) * 20
}

export const options = {
  noConnectionReuse: true,
  stages: [
    // 00:00 - 08:00
    { duration: '2m', target: targetNumberOfVUs(300, 450) },
    { duration: '2m', target: targetNumberOfVUs(50, 150) },
    { duration: '2m', target: targetNumberOfVUs(0, 50) },
    { duration: '2m', target: targetNumberOfVUs(50, 150) },
    // 08:00 - 12:00
    { duration: '2m', target: targetNumberOfVUs(750, 1000) },
    { duration: '2m', target: targetNumberOfVUs(750, 1000) },
    // 12:00 - 16.00
    { duration: '2m', target: targetNumberOfVUs(850, 1000) },
    { duration: '2m', target: targetNumberOfVUs(850, 1000) },
    // 16:00 - 22.00
    { duration: '2m', target: targetNumberOfVUs(500, 750) },
    { duration: '2m', target: targetNumberOfVUs(500, 750) },
    { duration: '2m', target: targetNumberOfVUs(450, 600) },
    // 22:00 - 00.00
    { duration: '2m', target: targetNumberOfVUs(300, 450) },
  ]
}

export default function() {
  http.get('http://api.default.svc.cluster.local:1323')
  sleep(1)
}
