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
    { duration: '2m', target: getRandomIntInclusive(30, 45) },
    { duration: '2m', target: getRandomIntInclusive(5, 15) },
    { duration: '2m', target: getRandomIntInclusive(0, 5) },
    { duration: '2m', target: getRandomIntInclusive(5, 15) },
    // 08:00 - 12:00
    { duration: '2m', target: getRandomIntInclusive(75, 100) },
    { duration: '2m', target: getRandomIntInclusive(75, 100) },
    // 12:00 - 16.00
    { duration: '2m', target: getRandomIntInclusive(85, 100) },
    { duration: '2m', target: getRandomIntInclusive(85, 100) },
    // 16:00 - 22.00
    { duration: '2m', target: getRandomIntInclusive(50, 75) },
    { duration: '2m', target: getRandomIntInclusive(50, 75) },
    { duration: '2m', target: getRandomIntInclusive(45, 60) },
    // 22:00 - 00.00
    { duration: '2m', target: getRandomIntInclusive(30, 45) },
  ]
}

export default function() {
  http.get('http://api.default.svc.cluster.local:1323')
  sleep(1)
}
