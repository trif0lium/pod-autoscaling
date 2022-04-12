import http from 'k6/http'
import { sleep } from 'k6'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const options = {
  stages: [
    // 00:00 - 08:00
    { duration: '2m', target: getRandomIntInclusive(300, 450) },
    { duration: '2m', target: getRandomIntInclusive(50, 150) },
    { duration: '2m', target: getRandomIntInclusive(0, 50) },
    { duration: '2m', target: getRandomIntInclusive(50, 150) },
    // 08:00 - 12:00
    { duration: '2m', target: getRandomIntInclusive(750, 1000) },
    { duration: '2m', target: getRandomIntInclusive(750, 1000) },
    // 12:00 - 16.00
    { duration: '2m', target: getRandomIntInclusive(850, 1000) },
    { duration: '2m', target: getRandomIntInclusive(850, 1000) },
    // 16:00 - 22.00
    { duration: '2m', target: getRandomIntInclusive(500, 750) },
    { duration: '2m', target: getRandomIntInclusive(500, 750) },
    { duration: '2m', target: getRandomIntInclusive(450, 600) },
    // 22:00 - 00.00
    { duration: '2m', target: getRandomIntInclusive(300, 450) },
  ]
}

export default function() {
  http.get('http://api.default.svc.cluster.local:1323')
  sleep(1)
}
