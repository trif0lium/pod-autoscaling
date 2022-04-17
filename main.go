package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", fib)
	e.GET("/healthz", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]bool{"ok": true})
	})

	p := prometheus.NewPrometheus("api", nil)
	p.Use(e)
	e.Logger.Fatal(e.Start(":1323"))
}

func fib(c echo.Context) error {
	min := 27
	max := 35
	rand.Seed(time.Now().UnixNano())
	return c.String(http.StatusOK, fmt.Sprint(_fib(rand.Intn(max-min)+min)))
}

func _fib(n int) uint64 {
	if n <= 1 {
		return 1
	}
	return _fib(n-1) + _fib(n-2)
}
