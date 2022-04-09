FROM golang:1.16 as build-env
WORKDIR /__w
ADD go.mod go.sum ./
RUN go mod download
ADD main.go ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main -ldflags '-w -s' main.go

FROM scratch
WORKDIR /__w
COPY --from=build-env /__w/main /__w
COPY --from=build-env /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 1323
ENTRYPOINT ["/__w/main"]
