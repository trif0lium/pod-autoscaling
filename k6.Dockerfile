FROM node:16.14.2
WORKDIR /__w
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 \
  && echo "deb https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list \
  && apt-get update \
  && apt-get install k6
COPY k6.js .
CMD k6 run k6.js
