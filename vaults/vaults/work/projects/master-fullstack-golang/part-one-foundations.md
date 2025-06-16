---
id: part-one-foundations
aliases: []
tags: []
---

[Back To Index](/projects/master-fullstack-golang/index.md)

# Part 1: Foundations

## Outline

Set the stage for the course, introduce golang and web devlopment

**Module 1: Setting the Stage**
* Lesson (main) 1.1: Welcome! Course Overview
* Lesson (main) 1.2: Why Choose Go for Web Applications?
* Lesson (main) 1.3: Why Build a Blog?
* Lesson (main) 1.4: Modern Web Development: MPA vs SPA
* Lesson (main) 1.5: Getting access to code

**Module 2: Golang Crash Course**
* Lesson (main) 2.1: Go Language Fundamentals 
* Lesson (main) 2.2: Structs and Interfaces in Go: Building Blocks for Web Apps
* Lesson (main) 2.3: Understanding Concurrency: Goroutines & Channels
* Lesson (main) 2.4: Effective Error Handling in Go

**Module 3: Structuring Your Go Web Application**
* Lesson (main) 3.1: MVC (Model-View-Controller) Architecture
* Lesson (main) 3.2: MVC (Model-View-Controller) Adapting it for Go Web Apps
* Lesson (main) 3.3: Project Initialization: `go mod init`, Folder Structure Setup
* Lesson (main) 3.4: Creating a simple controller
* Lesson (main) 3.5: Creating a simple model
* Lesson (main) 3.6: Choosing a router: Echo
* Lesson (main) 3.7: Creating a route with echo
* Lesson (main) 3.8: Setting up the server
* Lesson (main) 3.9: Creating a config package and dot env files
* Lesson (main) 3.10: Making it come together in cmd/app/main.go

## Module 1: Setting the Stage

## Module 2: Golang Crash Course

### 2.1: Go Language Fundamentals

Introduction to Go's Type System

Go is a strongly typed language, meaning we must specify the type of our data. Variables can be strings, integers, booleans, etc. Go doesn't have the concept of empty or null - instead, it uses zero values.

**Variables and Zero Values**

```go
package main

import "fmt"

func main() {
    // Explicit variable declaration (gets zero value)
    var trueOrFalse bool
    fmt.Println(trueOrFalse) // false (zero value for bool)
    
    var apiKey string
    fmt.Println(apiKey) // "" (zero value for string)
    
    var count int
    fmt.Println(count) // 0 (zero value for int)
    
    // Short variable declaration (type inferred)
    secretKey := "super secret string"
    fmt.Println(secretKey) // "super secret string"
}
```

**Constants**
Constants are fixed values known at compile time that cannot change:

```go
package main

import "fmt"

const API_KEY = "super secret"
const MAX_USERS = 100
const IS_PRODUCTION = false

func main() {
    fmt.Println("API Key:", API_KEY)
    fmt.Println("Max Users:", MAX_USERS)
    fmt.Println("Production:", IS_PRODUCTION)
}
```

**Control Flow - If Statements**

```go
package main

import "fmt"

func main() {
    apiKey := "super secret"
    
    if apiKey == "super secret" {
        fmt.Println("Access granted")
    } else if apiKey == "not super secret" {
        fmt.Println("Limited access")
    } else {
        fmt.Println("Access denied")
    }
}
```

**Switch Statements**
Switch statements provide a cleaner alternative to multiple if-else statements:

```go
package main

import "fmt"

func main() {
    apiKey := "super secret"
    
    switch apiKey {
    case "super secret":
        fmt.Println("Full access granted")
    case "not so secret", "basic key":
        fmt.Println("Limited access")
    default:
        fmt.Println("Access denied")
    }
}
```

**Functions and Multiple Return Values**

```go
package main

import (
    "errors"
    "fmt"
)

// Basic function
func validateAPIKey(key string) bool {
    isValid := false
    // Do some validation logic here
    if key == "super secret" {
        isValid = true
    }
    return isValid
}

// Function with multiple return values
func validateAPIKeyWithError(key string) (bool, error) {
    if key == "" {
        return false, errors.New("could not validate key: empty key")
    }
    
    if key != "super secret" {
        return false, errors.New("could not validate key: invalid key")
    }
    
    return true, nil
}

// Function with named return values
func validateAPIKeyNamed(key string) (isValid bool, err error) {
    if key == "" {
        err = errors.New("could not validate key: empty key")
        return
    }
    
    if key == "super secret" {
        isValid = true
    }
    
    return
}

func main() {
    // Using basic function
    isValid := validateAPIKey("super secret")
    fmt.Println("Is valid:", isValid)
    
    // Using function with multiple returns
    valid, err := validateAPIKeyWithError("super secret")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Valid:", valid)
    
    // Ignoring return values with underscore
    valid2, _ := validateAPIKeyWithError("test")
    fmt.Println("Valid2:", valid2)

}
```

**Arrays and Slices**
```go
package main

import "fmt"

func main() {
    // Array (fixed size)
    var fixedWallets [2]string
    fixedWallets[0] = "wallet1"
    fixedWallets[1] = "wallet2"
    
    // Slice (dynamic size)
    var wallets []string
    wallets = append(wallets, "wallet1")
    wallets = append(wallets, "wallet2")
    wallets = append(wallets, "wallet3")
    
    fmt.Println("Array:", fixedWallets)
    fmt.Println("Slice:", wallets)
}
```

**Loops**
Go only has one type of loop - the for loop:

```go
package main

import "fmt"

func main() {
    wallets := []string{"wallet1", "wallet2", "wallet3"}
    
    // Range loop with index and value
    for index, value := range wallets {
        fmt.Printf("Index: %d, Value: %s\n", index, value)
    }
    
    // Range loop with only value (ignore index)
    for _, value := range wallets {
        fmt.Println("Wallet:", value)
    }
    
    // Range loop with only index
    for index := range wallets {
        fmt.Printf("Processing wallet at index: %d\n", index)
    }
    
    // Traditional for loop
    for i := 0; i < 5; i++ {
        fmt.Printf("Iteration: %d\n", i)
    }
}
```

**Maps**
Maps are key-value data structures:

```go
package main

import "fmt"

func main() {
    // Create a zero-valued map
    var cafesInCities map[string][]string
    
    // Initialize the map
    cafesInCities = make(map[string][]string)
    
    // Add data
    cafesInCities["New York"] = []string{"Central Perk", "Blue Bottle", "Stumptown"}
    cafesInCities["San Francisco"] = []string{"Blue Bottle", "Philz", "Ritual"}
    
    // Loop over map
    for city, cafes := range cafesInCities {
        fmt.Printf("City: %s\n", city)
        for _, cafe := range cafes {
            fmt.Printf("  - %s\n", cafe)
        }
    }
}
```

### 2.2: Structs and Interfaces in Go: Building Blocks for Web Apps

**Understanding Structs**
Go uses composition instead of inheritance. Structs are the building blocks for creating complex data structures:

```go
package main

import "fmt"

// Basic struct definition
type User struct {
    ID   string
    Name string
    Email string
}

type Account struct {
    ID      string
    Balance int64
    UserID  string
}

// Composition - Wallet contains User and Account
type Wallet struct {
    ID      string
    User    User
    Account Account
}

func main() {
    // Creating struct instances
    user := User{
        ID:    "user-123",
        Name:  "John Doe",
        Email: "john@example.com",
    }
    
    account := Account{
        ID:      "acc-456",
        Balance: 10000,
        UserID:  user.ID,
    }
    
    wallet := Wallet{
        ID:      "wallet-789",
        User:    user,
        Account: account,
    }
    
    fmt.Printf("Wallet: %+v\n", wallet)
}
```

**Methods on Structs**
```go
package main

import (
    "errors"
    "fmt"
)

type Wallet struct {
    ID      string
    Balance int64
}

// Method with value receiver
func (w Wallet) GetBalance() int64 {
    return w.Balance
}

// Method with pointer receiver (can modify the struct)
func (w *Wallet) Withdraw(amount int64) error {
    if w.Balance < amount {
        return errors.New("insufficient funds")
    }
    w.Balance -= amount
    return nil
}

func (w *Wallet) Deposit(amount int64) {
    w.Balance += amount
}

func main() {
    wallet := &Wallet{
        ID:      "wallet-123",
        Balance: 10000,
    }
    
    fmt.Println("Initial balance:", wallet.GetBalance())
    
    // Deposit money
    wallet.Deposit(5000)
    fmt.Println("After deposit:", wallet.GetBalance())
    
    // Withdraw money
    err := wallet.Withdraw(3000)
    if err != nil {
        fmt.Println("Withdrawal error:", err)
    } else {
        fmt.Println("After withdrawal:", wallet.GetBalance())
    }
}
```

**Interfaces and Duck Typing**
Interfaces define behavior. If a type has the methods defined in an interface, it automatically implements that interface:

```go
package main

import (
    "errors"
    "fmt"
)

// Withdrawer interface defines behavior
type Withdrawer interface {
    Withdraw(amount int64) error
}

// Depositor interface
type Depositor interface {
    Deposit(amount int64)
}

// Combined interface
type BankAccount interface {
    Withdrawer
    Depositor
    GetBalance() int64
}

// Regular wallet
type Wallet struct {
    ID      string
    Balance int64
}

func (w *Wallet) Withdraw(amount int64) error {
    if w.Balance < amount {
        return errors.New("insufficient funds")
    }
    w.Balance -= amount
    return nil
}

func (w *Wallet) Deposit(amount int64) {
    w.Balance += amount
}

func (w *Wallet) GetBalance() int64 {
    return w.Balance
}

// Visa wallet - different implementation
type VisaWallet struct {
    CardNumber string
    Balance    int64
    CreditLimit int64
}

func (v *VisaWallet) Withdraw(amount int64) error {
    availableCredit := v.Balance + v.CreditLimit
    if availableCredit < amount {
        return errors.New("exceeds credit limit")
    }
    v.Balance -= amount
    return nil
}

func (v *VisaWallet) Deposit(amount int64) {
    v.Balance += amount
}

func (v *VisaWallet) GetBalance() int64 {
    return v.Balance
}

// Function that works with any BankAccount
func ProcessPayment(account BankAccount, amount int64) error {
    if account.GetBalance() < amount {
        return errors.New("insufficient balance for payment")
    }
    return account.Withdraw(amount)
}

// Function that works with any Withdrawer
func SendMoney(withdrawer Withdrawer, amount int64) error {
    return withdrawer.Withdraw(amount)
}

func main() {
    // Both types implement BankAccount interface
    wallet := &Wallet{ID: "wallet-123", Balance: 10000}
    visaWallet := &VisaWallet{
        CardNumber:  "1234-5678-9012-3456",
        Balance:     5000,
        CreditLimit: 2000,
    }
    
    // Can use either with ProcessPayment
    err := ProcessPayment(wallet, 1000)
    if err != nil {
        fmt.Println("Payment error:", err)
    } else {
        fmt.Println("Payment processed from wallet")
    }
    
    err = ProcessPayment(visaWallet, 1500)
    if err != nil {
        fmt.Println("Payment error:", err)
    } else {
        fmt.Println("Payment processed from visa wallet")
    }
    
    // Can use either with SendMoney (only needs Withdrawer)
    SendMoney(wallet, 500)
    SendMoney(visaWallet, 300)
    
    fmt.Printf("Final wallet balance: %d\n", wallet.GetBalance())
    fmt.Printf("Final visa wallet balance: %d\n", visaWallet.GetBalance())
}
```

**Package Organization and Visibility**

```go
// File: auth/auth.go
package auth

import "errors"

// Public function (exported - starts with uppercase)
func AuthenticateMe(username, password string) (bool, error) {
    if username == "" || password == "" {
        return false, errors.New("username and password required")
    }
    
    // Call private function
    if validatePassword(password) {
        return true, nil
    }
    
    return false, errors.New("invalid credentials")
}

// Private function (not exported - starts with lowercase)
func validatePassword(password string) bool {
    return len(password) >= 8

}
```

```go
// File: main.go
package main

import (
    "fmt"
    "./auth" // Import the auth package
)

func main() {
    // Can use AuthenticateMe (public)
    authenticated, err := auth.AuthenticateMe("user", "password123")
    if err != nil {
        fmt.Println("Authentication error:", err)
        return
    }
    
    if authenticated {
        fmt.Println("Successfully authenticated!")
    }
    
    // Cannot use validatePassword (private to auth package)
    // This would cause a compile error:
    // auth.validatePassword("test") // Error: cannot refer to unexported name
}
```

### 2.3: Understanding Concurrency: Goroutines & Channels

Note: The provided transcript doesn't cover concurrency topics like goroutines and channels. Here's what this lesson would typically include for a complete Go course:

**Introduction to Goroutines**

Goroutines are Go's way of handling concurrent operations. They're lightweight threads managed by the Go runtime.

```go
package main

import (
    "fmt"
    "time"
)

func sayHello(name string) {
    for i := 0; i < 3; i++ {
        fmt.Printf("Hello, %s! (%d)\n", name, i+1)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // Regular function call (synchronous)
    sayHello("Alice")
    
    // Goroutine (asynchronous)
    go sayHello("Bob")
    go sayHello("Charlie")
    
    // Wait for goroutines to complete
    time.Sleep(1 * time.Second)
    fmt.Println("Main function ending")
}
```

**Channels for Communication**

```go
package main

import (
    "fmt"
    "time"
)

func processData(data string, resultChan chan string) {
    // Simulate processing time
    time.Sleep(100 * time.Millisecond)
    result := fmt.Sprintf("Processed: %s", data)
    resultChan <- result // Send result to channel
}

func main() {
    // Create a channel
    resultChan := make(chan string)
    
    // Start goroutines
    go processData("Data1", resultChan)
    go processData("Data2", resultChan)
    go processData("Data3", resultChan)
    
    // Receive results
    for i := 0; i < 3; i++ {
        result := <-resultChan // Receive from channel
        fmt.Println(result)
    }
}
```

### 2.4: Effective Error Handling in Go

**Go's Error Philosophy**
In Go, errors are values. The language encourages explicit error handling rather than exceptions.

```go
package main

import (
    "errors"
    "fmt"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation error in field '%s': %s", e.Field, e.Message)
}

// Function that returns an error
func validateUser(name, email string) error {
    if name == "" {
        return ValidationError{
            Field:   "name",
            Message: "name cannot be empty",
        }
    }
    
    if email == "" {
        return ValidationError{
            Field:   "email",
            Message: "email cannot be empty",
        }
    }
    
    if len(email) < 5 {
        return ValidationError{
            Field:   "email",
            Message: "email too short",
        }
    }
    
    return nil // No error
}

// Function with multiple return values including error
func createUser(name, email string) (*User, error) {
    if err := validateUser(name, email); err != nil {
        return nil, fmt.Errorf("failed to create user: %w", err)
    }
    
    user := &User{
        ID:    generateID(),
        Name:  name,
        Email: email,
    }
    
    return user, nil
}

func generateID() string {
    return "user-123" // Simplified for example
}

type User struct {
    ID    string
    Name  string
    Email string
}

func main() {
    // Error handling pattern
    user, err := createUser("", "test@example.com")
    if err != nil {
        fmt.Printf("Error creating user: %v\n", err)
        
        // Type assertion to get specific error details
        var validationErr ValidationError
        if errors.As(err, &validationErr) {
            fmt.Printf("Validation failed for field: %s\n", validationErr.Field)
        }
        return
    }
    
    fmt.Printf("User created successfully: %+v\n", user)
    
    // Successful case
    user2, err := createUser("John Doe", "john@example.com")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    fmt.Printf("User2 created: %+v\n", user2)
}
```

**Error Wrapping and Unwrapping**
```go
package main

import (
    "errors"
    "fmt"
)

var ErrUserNotFound = errors.New("user not found")
var ErrDatabaseConnection = errors.New("database connection failed")

func fetchUserFromDB(id string) (*User, error) {
    // Simulate database error
    if id == "db-error" {
        return nil, ErrDatabaseConnection
    }
    
    // Simulate user not found
    if id != "valid-id" {
        return nil, ErrUserNotFound
    }
    
    return &User{ID: id, Name: "John Doe"}, nil
}

func getUserProfile(userID string) (*User, error) {
    user, err := fetchUserFromDB(userID)
    if err != nil {
        // Wrap the error with additional context
        return nil, fmt.Errorf("failed to get user profile for ID %s: %w", userID, err)
    }
    
    return user, nil
}

func main() {
    // Test different error scenarios
    testCases := []string{"valid-id", "invalid-id", "db-error"}
    
    for _, userID := range testCases {
        user, err := getUserProfile(userID)
        if err != nil {
            fmt.Printf("Error for user ID '%s': %v\n", userID, err)
            
            // Check for specific errors
            if errors.Is(err, ErrUserNotFound) {
                fmt.Println("  -> This is a 'user not found' error")
            }
            if errors.Is(err, ErrDatabaseConnection) {
                fmt.Println("  -> This is a database connection error")
            }
        } else {
            fmt.Printf("Success for user ID '%s': %+v\n", userID, user)
        }
        fmt.Println()
    }

}
```

**Panic and Recover (Use Sparingly)**

```go
package main

import (
    "fmt"
    "log"
)

func riskyFunction() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("Recovered from panic: %v\n", r)
        }
    }()
    
    // This will cause a panic
    var slice []int
    fmt.Println(slice[10]) // Index out of range
}

func main() {
    fmt.Println("Starting program...")
    
    riskyFunction()
    
    fmt.Println("Program continues after recovery")
    
    // Generally, it's better to return errors instead of panicking
    result, err := safeFunction()
    if err != nil {
        log.Printf("Safe function error: %v", err)
        return
    }
    
    fmt.Printf("Safe function result: %v\n", result)
}

func safeFunction() ([]int, error) {
    slice := make([]int, 5)
    
    // Check bounds instead of panicking
    index := 10
    if index >= len(slice) {
        return nil, fmt.Errorf("index %d out of range for slice of length %d", index, len(slice))
    }
    
    slice[index] = 42
    return slice, nil
}
```

**Pointers and Memory Management**
```go
package main

import "fmt"

type LargeWallet struct {
    ID      string
    Balance int64
    History []string
}

// Function that takes a pointer (more efficient for large structs)
func processWalletByPointer(wallet *LargeWallet) {
    wallet.Balance += 1000 // Modifies the original
    wallet.History = append(wallet.History, "Bonus added")
}

// Function that takes a value (creates a copy)
func processWalletByValue(wallet LargeWallet) LargeWallet {
    wallet.Balance += 1000 // Modifies the copy
    wallet.History = append(wallet.History, "Bonus added")
    return wallet // Return the modified copy
}

func main() {
    // Create a wallet
    largeWallet := LargeWallet{
        ID:      "wallet-123",
        Balance: 5000,
        History: []string{"Account created"},
    }
    
    fmt.Printf("Original wallet: %+v\n", largeWallet)
    
    // Process by pointer (modifies original)
    processWalletByPointer(&largeWallet)
    fmt.Printf("After pointer processing: %+v\n", largeWallet)
    
    // Create another wallet for value example
    anotherWallet := LargeWallet{
        ID:      "wallet-456",
        Balance: 3000,
        History: []string{"Account created"},
    }
    
    fmt.Printf("Another wallet before: %+v\n", anotherWallet)
    
    // Process by value (original unchanged, but we get a modified copy back)
    modifiedWallet := processWalletByValue(anotherWallet)
    fmt.Printf("Original after value processing: %+v\n", anotherWallet)
    fmt.Printf("Modified copy: %+v\n", modifiedWallet)
    
    // Pointer basics
    var largePointer *LargeWallet = &largeWallet
    fmt.Printf("Pointer address: %p\n", largePointer)
    fmt.Printf("Dereferenced pointer: %+v\n", *largePointer)
}
```

## Module 3: Structuring Your Go Web Application

### 3.1: MVC (Model-View-Controller) Architecture

### 3.2: MVC (Model-View-Controller) Adapting it for Go Web Apps

### 3.3: Project Initialization: `go mod init`, Folder Structure Setup

Notes:
- git init
- go mod init
- create folders (cmd/app, config, controllers, database, models, router, server, views)

### 3.4: Creating a simple controller

```go
package controllers

import (
	"master-fullstack-go/views"

	"github.com/labstack/echo/v4"
)

type Controller struct{}

func (c Controller) LandingPage(ec echo.Context) error {
	return views.LandingPage().Render(ec.Request().Context(), ec.Response())
}
```

### 3.5: Creating a simple model

Notes:
- mention not why not create methods on user struct

```go
package models

import "github.com/google/uuid"

type User struct {
	ID    uuid.UUID
	Name  string
	Email string
}

func GetUser(id uuid.UUID) User {
    // logic to pull user from db
    return User{}
}
```

### 3.6: Choosing a router: Echo

```go
package router

import (
	"master-fullstack-go/controllers"

	"github.com/labstack/echo/v4"
)

type Router struct {
	e *echo.Echo
	ctrls  controllers.Controller
}

func New(ctrl controllers.Controller) *Router {
	e := echo.New()

	return &Router{e, ctrl}
}
```

### 3.7: Creating a route with echo

Notes:
- talk about load
- talk about splitting up as you go along

```go
func (r *Router) LoadRoutes() *echo.Echo {
	r.e.GET("", func(c echo.Context) error {
		return r.ctrls.LandingPage(c)
	})

	return r.e
}
```

### 3.8: Setting up the server

Notes:
- talk about graceful shutdown

```go
package server

import (
	"context"
	"fmt"
	"log/slog"
	"master-fullstack-go/config"
	"net"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

type Http struct {
	router *echo.Echo
	host   string
	port   string
	srv    *http.Server
}

func NewHttp(
	ctx context.Context,
	router *echo.Echo,
	cfg config.Cfg,
) Http {
	port := cfg.ServerPort
	host := cfg.ServerHost

	srv := &http.Server{
		Addr:         fmt.Sprintf("%v:%v", host, port),
		Handler:      router,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 5 * time.Second,
		BaseContext:  func(_ net.Listener) context.Context { return ctx },
	}

	return Http{
		router,
		host,
		port,
		srv,
	}
}

func (s *Http) Start(ctx context.Context) error {
	slog.Info("starting server on", "host", s.host, "port", s.port)

	if err := s.srv.ListenAndServe(); err != nil &&
		err != http.ErrServerClosed {
		return fmt.Errorf("server error: %w", err)
	}

	return nil
}
```

### 3.9: Creating a config package and dot env files

```go
package config

import "github.com/caarlos0/env/v10"

type Cfg struct {
	ServerHost string `env:"SERVER_HOST"`
	ServerPort string `env:"SERVER_PORT"`
}

func New() Cfg {
	appCfg := Cfg{}

	if err := env.ParseWithOptions(&appCfg, env.Options{
		RequiredIfNoDef: true,
	}); err != nil {
		panic(err)
	}

	return appCfg
}
```

### 3.10: Making it come together in cmd/app/main.go

Notes:
- talk about main vs run

```go
package main

import (
	"context"
	"fmt"
	"master-fullstack-go/config"
	"master-fullstack-go/controllers"
	"master-fullstack-go/router"
	"master-fullstack-go/server"
	"os"
)

func run(ctx context.Context) error {
	cfg := config.New()

	ctrls := controllers.Controller{}

	router := router.New(ctrls)

	srv := server.NewHttp(ctx, router.LoadRoutes(), cfg)

	return srv.Start(ctx)
}

func main() {
	ctx := context.Background()
	if err := run(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}
```

```just
set dotenv-load

run:
    wgo -file=.go -file=.templ -xfile=_templ.go just compile-templates :: just run-app

run-app:
    go run cmd/app/main.go
	
compile-templates:
    templ generate
```
