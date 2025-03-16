---
id: projects--golang-blog-course--module-two-index
aliases: []
tags: []
---

[Back](/projects/golang-blog-course/index.md)

<!--toc:start-->
- [Module Two](#module-two)
  - [Episode 1,2,3](#episode-123)
    - [EP 1,2,3 Script](#ep-123-script)
  - [Episode 4](#episode-4)
    - [EP 4 Script](#ep-4-script)
  - [Episode 5](#episode-5)
    - [EP 5 Script](#ep-5-script)
  - [Episode 6](#episode-6)
  - [Episode 7](#episode-7)
    - [EP 7 Script](#ep-7-script)
  - [Episode 8](#episode-8)
    - [Episode 8 script](#episode-8-script)
<!--toc:end-->

# Module Two

Current Planned Vids:
1. Intro to Go 1
2. Intro to Go 2
3. Intro to Go 3
4. Structuring Golang applications
5. Templating with Temp
6. Just enough interactivity with HMTX
7. Getting started with postgres
8. Servers, routers and endpoints

## Episode 1,2,3

Should quick show and explain the basic features of Golang. At least enoguh so
that newcomers to Go can follow along with the course.

### EP 1,2,3 Script

Welcome to module 2!

This will be a quick intro to the Go programming language so that everybody should understand enough Go, to follow along.

If you're already familiar with Go you can skip this part.

---

**DATA TYPES**
Alright, so Golang is a strongly typed language. 

This means you need to specify what type your data is, e.g. if your variable is a string, integer etc.

The concept of empty or null does not exist in Go. 

Instead, Go uses what is known as zero value. This means that if you create a variable without giving it a value, Go will assign it a default value, or zero value.

This means that if you do:
```go
var trueOrFalse bool
```
The value of "trueOrFalse" will in this case be false. 

For a string type it will be an empty string and so forth.

**VARIABLES**
As mentioned earlier, we must specify what type our data is or expected to be. So when creating variables we need to explicit about the type of each one.

Example:
```go
// case 1:
var apiKey string

// case 2:
apiKey := "super-secret"
```

Both ways is completely valid way of declaring a variable where the first use explicit variable declaration and the other use the short variable declaration.

Remember when we talked about zero value? The first case, will initialize the apiKey variable with the zero value of the string type: an empty string.

In case 2, Go will infer that apiKey is a string based on the assigned value.

We will use both ways in this course, each where it makes sense.

**CONSTANTS**
Next, Go also has constants. We don't need to go much into detail of the inner workings (look up heap vs stack if interested) but just know that a constant is a fixed value, at compile time, that cannot be changed.

We will get back to what compile time means later on.

Since whatever we declare as a constant stays fixed the "size" of it must be known upfront. So you cannot declare a constant that is based on something foreign.

Lets take an example.

```go
const ApiKey = "constant-and-super-secret"
```
We just declared a super secret api key that we can reference throughout our program.

The types that can be used as constants are: string, boolean or numeric values.`

**IF STATEMENTS**
If statements lets you control the flow of programming based on certain conditions. In Go, you specify it using the 'if' keyword, something that evaluates to a boolean condition and then brackets that holds the 'thing' you want executed.

This looks like this:
```go
if ApiKey == "constant-and-super-secret" {
    // do something
}
```
Note that the 'do something' here only happens if the conditional is true.

We can also specify an else clause that triggers if the first condition doesn't hold.
```go
if ApiKey == "constant-and-super-secret" {
    // do something
} else {
    // do something else
}
```

We can also add another if, known as an else if, that will be evaluated if the first condition is not true.
```go
if ApiKey == "constant-and-super-secret" {
    // do something
} else if ApiKey == "not-super-secret{
    // do something else
}
```

**SWITCH STATEMENTS**
Alternatively to if-statements we also have switch statements where we can efficiently handle multiple conditions, compared to long chains of if/else statements.

A full example looks like this:
```go
//instead of if statements for conditional behavior, you can also use switch
//statements
switch ApiKey {
    case "constant-and-super-secret":
        // do something
    case "not-so-secret":
        // do something
    default:
        // do something default
}

We use the switch keyword and a value that can be dynamic, and then handle each case, and if nothing is found we fallback to a default operation. 

We can have as many cases as we need and it's not required to provide a default.

It's also possible to group multiple values into one case, that will be handle by the same operation like this:
//you can have as many cases as you want and are not limited to options that 
//match the case, e.g.
switch ApiKey {
    case "constant-and-super-secret", "super-secret":
        // do something
}

//and you do not need to provide a default case
```

**FUNCTIONS**
Functions, for the uninitiated is simply reusable blocks of code that perform a specific task.

Here is an example of a function that takes in a string, does some operation and returns that string:
```go
func ValidateApiKey(key string) bool {
	var isValid bool
	// do some operation based on 'key' value

	return isValid
}
```

You can also pre-name the variable a function return:
```go
func ValidateApiKey(key string) (isValid bool) {
	// do some operation based on 'key' value
	return isValid
}
```
I don't personally like this but it's completely valid way to go about writing your functions.

Lastly, functions can also return multiple values. You will often see functions in Go return a value and an error since errors are values, and Go wants you to handle them right away.

But you can potentially return more than two values like this:
```go
func MultipleReturnValues() (string, int64, error) {
    // will return a string value, integer 64 value and an error

    return "some-string-value", 9000, errors.New("this is an error")
}

stringValue, integerValue, err := MultipleReturnValues()

// values can be "ignored" with an underscore. If you don't need a value from a
// function this will be the way to use the function as Go will not compile
// with unused variables
stringValue, _, err := MultipleReturnValues()

```
Here we call the MultipleReturnValues function and initialize three variables: stringValue, integerValue and err.

It's also possible to ignore certain values but placing an underscore in the value's place.

**PRIVATE/PUBLIC**
You might have noticed that sometimes I have used lowecase names and at other times uppercase.

This is not an accident. The way you export something from a package in Go is to uppercase the name, which goes for everything.

So here:
```go
// you might have noticed that the varibles in the first example was lowercase
// while the functions was uppercase. They way to export _something_ from a
// package in Go is to uppercase it.
package helloworld
func HelloWorld() {}
func hiWorld() {}
```
the first function is exported from the helloworld package while the second is not and can only be used in the context of the helloworld package.

We will touch upon packages in a minute.

**STRUCT/COMPOSITION**
Go is not an object-oriented language and does not have inheritance. 

It uses composition where you combine structures to reflect a larger structure. This could be that you have a wheel, chassis, brakes etc structures that you then combine into a larger structure, a car.

To create a structure, or as they are known in Go, a struct, you use the 'type' keyword, name, the 'struct' keyword and then brackets.

A simple user struct with no fields looks like this:
```go
// the way you organize data in Go is around struct(tures) that has fields
type User struct {}
```

We can specify fields and their data type on a structure.
```go
// Go doesn't have inheritance but composition. This means that we combine
// structures into whatever object we want to represent
type User struct {
    ID uuid.UUID
}
```

And we combine structs by specifying them as fields like so:
```go
type Account struct {
    ID uuid.UUID
    Balance int64
}

type Wallet struct {
    ID uuid.UUID
    User User
    Account Account
}
```

You can still define methods, similar to what you might know from OOP, on a structure.
```go
// you can define methods on a struct that reflects a "behavior" that struct
// can do
func (w Wallet) Withdraw(amount int64) error {
    if (w.Account.Balance - amount) < 0 {
        return errors.New("insufficient funds")
    }

    w.Account.Balance -= amount

    return nil
}
// if you come from an OOP world, don't try and mimick OOP in Go with embedded structs
```

These methods are not inherited like in OOP so User and Account cannot use the Withdraw method on Wallet.

**INTERFACES**
Go uses duck typing and what this means is that if some struct has a certain type of behavior, thing methods like on our Wallet struct, it can be described by that behavior.

It's called that because of the phrase:
If it quack like a duck and walks like a duck, it's probably a duck

Take our wallet example from before. 

We might have a scenario where we have many different types of wallets but from a transaction point of view, are only interested in the wallet being able to withdraw funds.

We can describe this as:
```go
// excuse the bad name please, you often see interfaces named with a "er" at the end
// e.g. stringer, reader etc
type Withdrawer interface {
    Withdraw(amount int64) error
}
```

We can now use this in a generic way for, say, a send money function
```go
func SendMoney(moneyToSend int64, wallet Withdrawer) error {}
```
Since any wallet that has the method "Withdraw" fulfills the interface "Withdrawer" and can be passed to the SendMoney function.

It's tempting when learning to use interface to use them all the time.

But this will lead to overengineered spaghetti code unless your understanding of a the operating domain is very deep.

Interfaces should, as a rule of thumb, be discovered not created/thought up.

They are a powerful tool for abstraction and polymorphism and should be used with care.

**SLICES&ARRAYS**
To work with a sequence of elements in Go we can use slices or arrays. The former is dynamic in size while the latter is fixed in size.

You will most often use slices but let us see a few examples of both.

To create an array:
```go
var wallets [2]Wallet
```
We created an array that can hold two entries of our Wallet struct. Since the size of an array is part of its type, these two are distinct types:

```go
var walletsSmol [2]Wallet
var walletsBig [3]Wallet
```

A slice, on the other hand, is dynamic in size and grow as needed. They are built on top of arrays and are created in a similar way:
```go
var wallets []Wallet
```
Where we can continue to add wallets to the slice until we reach its capacity, the maximum size before reallocation occurs.

**LOOPS**
This is one of my favorite examples of the simplicity of Go, one way to do loops, the for loop.

A loop works like this:
```go
//we loop over a slice (you might also know this as an array)
for index, value := range []string{"you", "can", "loop", "over", "me"} {}
```

Or like so:

```go
startValue := 0
endValue := 20

for i := startValue; i < endValue; i++ {}
```

**MAPS**
We also have built-in support for maps in Go which are key-value data structures.

One example of when they are useful is situations where you want to group some values under a specific key.

An example of this:
```go
var cafesInCities map[string][]string

//you can loop over maps
for key, value := range cafesInCities {}
```

**PACKAGES**
In Go, we group related logic and functionality into a package, like we saw in the example of private vs public functions earlier.

You can have as many packages as you want. But, no matter the amount of packages you have, your program must have an entrypoint, the "package main" which must have a "func main() {}".

<!--You might have seen that all of our other examples have been run through this main function.-->

We can have multiple func main in a project that does different things, but they must be isolated into their own directory.o

A common approach is to create a directory like so:
```go
cmd/app/main.go
or
cmd/admin/main.go
```
Which we can now use to build our app and admin into different binaries.

<!--TALK ABOUT COMPILING!-->

**POINTERS**
Lastly, in Go we have the concept of pointers. 

This is more advanced and for those of you who knowns about pointers will probably find this section a bit lacking.

But the attempt here is to give a broad overview and mental model of the concept.

To point to something in Go you use the ampersand.
```go
largeWallet := Wallet{}

pointerToLargeWallet := &largeWallet
```

We can dereference something to get its value:
```go
dereferencedPointerToWallet := *pointerToLargeWallet
```

If you took the time to look up stack and head at the beginning you will probably know about pointers now.

But, when we say, declare a variable or a function, it must live somewhere. And that somewhere is known as 'memory'.

You can think of stack and heap as long-term and short-term memory.

The stack stores things in a more permanent way in the sense that the size of the stored item must be known upfront, it cannot change and is allocated and deallocated automatically.

While heap stores data in a more flexible way, and will dynamically allocate and deallocate during the runtime of our program.

This dynamic nature can sometime cause memory-leaks and cause the program to crash.

So what's the point in telling you this?

Well, we can reference things in Go either by what is known as reference or value.

So if you just want to reference, say, the apiKey variable earlier it's more efficient to just point to it's memory address than to allocate new space for a copy.

But, if we wanted to change the value we would need to change what is actually stored in memory. Then we can pass the whole object.

A good way to think about this is, when sending a package to somebody's house, it's much easier to just send the package to the address. Than it is to move the house to wherever your package is.

## Episode 4

Should try and explain what is meant by "let application evolve/start with main.go"

Talk about why domain-driven design is often quoted in Go material (microservices,
enterprisey applications)

Why model view controller is a good fit but has a bad image in Go

### EP 4 Script

How you should structure Golang applications is one of the most asked questions in regards to learning Go.

The common answer you often receive is "just start simple with main.go" or "whatever is best suited for your usecase/problem domain and let it grow".

While that is true, it is not exactly something that helps a person new to the language. 

What is "simple" and when has something grown enough that you need to restructure it.

Let me show you an example of starting simple.

---

Take a simple endpoint to create an user that might look something like this.

```go
func main() {
	http.HandleFunc("POST /user", func(w http.ResponseWriter, r *http.Request) {
		// parse data from request
        // validate the parsed data
		// store the user in the database
		// return a response

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"res": "user created"})
	})

	http.ListenAndServe(":8080", nil)
}
```

If you take a look at the comments; we have few operations different:
- parse some data from the request
- validate the parsed data
- store the user in the database
- return a response

Let's just add some placeholders for now.

```go
func parseNewUserRequest(data any) error {
    return nil
}

func validateNewUserData(data any) error {
    return nil
}

func InsertUser(userData any, databaseConnection sql.DB) error {
    return nil
}

func main() {
    databaseConnection := setupDatabaseConnection()

	http.HandleFunc("POST /user", func(w http.ResponseWriter, r *http.Request) {
		// parse data from request
        if err := parseNewUserRequest(); err != nil {
            // handle err
        }
        // validate the parsed data
        if err := validateNewUserData(); err != nil {
            // handle err
        }
		// store the user in the database
        if err := databaseConnection.InsertUser(); err != nil {
            // handle err
        }

		// return a response

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"res": "user created"})
	})

	http.ListenAndServe(":8080", nil)
}
```

---

It would also be nice if we could see the users we create.

```go
func QueryUser(databaseConnection sql.DB) (User, error) {
    return nil
}

func main() {
    databaseConnection := setupDatabaseConnection()

	http.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
        // look up user
        user, err := QueryUser(databaseConnection)
        if err != nil {
            // handle err
        }
		// return a response

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]any{"res": user})
	})

	http.ListenAndServe(":8080", nil)
}
```

Most of the code is hidden inside the placeholder functions and we're already starting to have a few things happening. 

We only have two operations for one resource.

This will work for now but we don't have to add much more before we probably would want to start breaking it up.

Let look at what options we have to go from here.

---

There are many ways to start breaking this up and just as many opinions.

This course will use what is known as a model-view-controller architecture, or MVC for short, which is a very well-established way of building web apps.

You might have heard that MVC is not suited for Go; this is not true. 

Some think that MVC is all about organizing code into folders.

Other think that the only way to create professional Go apps requires you to use domain-driven design with a hexagonal architecture, ports and adapters etc.

But MVC, like other approaches, are mainly a way to think about where code should live and what it should do.

MVC architecture provides you with an easy and intuitive way of breaking your applications into singular responsibilities. The controller handles incoming and outgoing data. The view handles how data is presented to the user and the model is in charge of business logic and data.

It's about separation of concerns. 

Let's break our hypothetical data API into a MVC architecture.

---

Let's start with models. We need to have two functions, one to get the user out of the database and one it insert it.

```go
// models/models.go
package models

func GetUser(databaseConnection sql.DB) (User, error) {
    user, err := QueryUser(databaseConnection)
    if err != nil {
        return User{}, err
    }

    return User{}, nil
}

func NewUser(databaseConnection sql.DB, userData any)  error {
    // validate the parsed data
    if err := validateNewUserData(); err != nil {
        return err
    }
	
    // store the user in the database
    if err := databaseConnection.InsertUser(); err != nil {
        return err
    }

    return nil
}
```

Our views is very basic, this layer will make more sense in the next video. But for now, it's only focused on the response when requesting a user.

```go
// views/views.go
package views

type User struct {
    ID uuid.UUID `json:"id"`
    Name string `json:"name"`
}
```

```go
// handlers/handlers.go
package handlers

func GetUser(databaseConnection sql.DB) func(w http.ResponseWriter, r *http.Request) {
    return func(w http.ResponseWriter, r *http.Request) {
        // look up user
        user, err := models.GetUser(databaseConnection, userID)
        if err != nil {
            // handle err
        }

	    // return a response
	    w.Header().Set("Content-Type", "application/json")
	    json.NewEncoder(w).Encode(map[string]any{"res": views.User{}})
    }
}

func CreateUser(databaseConnection sql.DB) func(w http.ResponseWriter, r *http.Request) {
    return func(w http.ResponseWriter, r *http.Request) {
		// parse data from request
        if err := parseNewUserRequest(); err != nil {
            // handle err
        }

		// store the user in the database
        if err := models.NewUser(databaseConnection, newUserData); err != nil {
            // handle err
        }

		// return a response
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"res": "user created"})
    }
}
```

---

It should start to become clear how we now have some guiding principles in what code goes where.

And more importantly, what package has which responsibility in the flow of the application. We will expand on this in the coming episodes but hopefully this gives to a foundational understanding.

Also, not everything has to go into a controller/model/view package. You can still group your code into packages that are more suitable. 

For example,take sending emails. This will probably require you to use an email provider and write some code to deal with the provider's API.

This doesn't really fit into any of the 3 categories but can easily juse live in its own package.

---

Given this is a Go course I feel like I should quickly touch on the other architectures mentioned.

Domain-driven design is and should only be used in large enterprise settings; you must have deep knowledge of your business domain before you can even begin the process.

It's as much a way to align various stakeholders on terminology and functionality as it is about code design.

Now, hexagonal architectures, made popular by a guy known as uncle bob is about code organization. However, the core idea s that you have layers in your code that does a specific thing.

And these layers have to point in a certain direction, towards the core. By pointing, it means that code in the core cannot know about code in the other layers. It's where the core buisness and domain logic live.

This is very similar to MVC where our business logic lives in the model layer and cannot know about controllers and views. In MVC, only the controllers know about views and models.

MVC is fit your project for a long time so don't feel the need to start dividing your applications into atomic pieces.

## Episode 5

Start by explaining idea of templating.

Showcase what the standard library does.

Intro to idea and purpose of templ.

Talk about advantages of everything is Go.

Syntax same, no "context switching", eaily create whole pages or fragments.

### EP 5 Script

In the last episode, we left the view part of MVC in a bit of a undefined place.

So, in this episode I want to give you an introduction on how you work with html templates to create views.

And, more specifically, how we can do that with templ.

But first, let me show you how this works in the standard library.

---

A typical html file looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main>
        <h1>I'm a html file</h1>  
    </main>
    <script src="index.js"></script>
  </body>
</html>
```

The way you would render this through the standard library, would be to do something like this:
```go
func RenderHtmlFile() ([]bytes, error) {
	htmlFile, err := template.ParseFiles(
		"./base.html",
	)
	if err != nil {
		return nil, err
	}

	var htmlBuffer bytes.Buffer
	if err := htmlFile.Execute(&htmlBuffer, nil); err != nil {
		return nil, err
	}

    return htmlBuffer.Bytes(), nil
}
```

And then pass the result of this to the relevant handler.
```go
	template, err := RenderHtmlFile()
	if err != nil {
		panic(err)
	}

	http.HandleFunc(
		"GET /",
		func(w http.ResponseWriter, r *http.Request) {
			// return a response
			w.Header().Set("Content-Type", "text/html")
			if _, err := w.Write(template); err != nil {
				// handle err
			}
		},
	)

	http.ListenAndServe(":8080", nil)
```

And if we run this we should see our template rendered in the browser.

---

Now, it would be great if we could show some dynamic data in the template as well.

Let us say that we have a blog, that allows for guest writers, and would like to dynamically show the name of the person who wrote a blog post.

We can't just hard code the names into the site which would quickly become troublesome. Luckily, we can pass data to our templates.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main>
        <h1>I'm a blog post written by {{ . }}</h1>  
    </main>
    <script src="index.js"></script>
  </body>
</html>
```

This is the way we would tell the template to render, whatever it is passed, in that place.

Next, we need to provide this to the template.

```go
func RenderHtmlFile() ([]bytes, error) {
	htmlFile, err := template.ParseFiles(
		"./base.html",
	)
	if err != nil {
		return nil, err
	}

	var htmlBuffer bytes.Buffer
	if err := htmlFile.Execute(&htmlBuffer, "John Carmack"); err != nil {
		return nil, err
	}

    return htmlBuffer.Bytes(), nil
}
```

Run it again, and we see that we have John Carmack as the author.

---

but what if we have more variables? We can just pass a struct:
```go
type BaseViewData struct {
    Author string
    PublicationTime string
}

func RenderHtmlFile() ([]bytes, error) {
	htmlFile, err := template.ParseFiles(
		"./base.html",
	)
	if err != nil {
		return nil, err
	}

	var htmlBuffer bytes.Buffer
	if err := htmlFile.Execute(&htmlBuffer, BaseViewData{Author: "John Carmack", PublicationTime: time.Now().String()}); err != nil {
		return nil, err
	}

    return htmlBuffer.Bytes(), nil
}
```
and update the template to use these variables instead:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
    <main>
        <h1>I'm a blog post written by {{ .Author }} and released on {{ .PublicationTime }}</h1>  
    </main>
    <script src="index.js"></script>
  </body>
</html>
```

Awesome, so far so good. But, it would be nice if we didn't have too write all this html for each page we have.

Luckily, we can define a template so we can reuse, or wrap, our html.

```html
<!-- base.html -->
{{ define "base" }}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="./favicon.ico" type="image/x-icon">
  </head>
  <body>
        {{ template "content" .}}
        {{ end }}
    <script src="index.js"></script>
  </body>
</html>
{{ end }}

<!-- home.html -->
{{ define "content" }}
<main>
    <h1>I'm a blog post written by {{ .Author }} and released on {{ .PublicationTime }}</h1>  
</main>
{{ end }}
```

And then we need to update our render html file again to include the new file, and instead of `Execute` we need to use `ExecuteTemplate` and specify the name.

```go
func RenderHtmlFile() ([]bytes, error) {
	htmlFile, err := template.ParseFiles(
		"./base.html",
        "./home.html",
	)
	if err != nil {
		return nil, err
	}

	var htmlBuffer bytes.Buffer
	if err := htmlFile.ExecuteTemplate(&htmlBuffer, "base", BaseViewData{Author: "John Carmack", PublicationTime: time.Now().String()}); err != nil {
		return nil, err
	}

    return htmlBuffer.Bytes(), nil
}
```

---

Now we can reuse our base template for all of our views.

This looks straight forward right? Well, that is because it is. We can still do loops, if statements and so forth using the standard library even though the syntax can look at bit...janky.

So why would you want to use something else and why should that be templ?

Let's take a look at their landing page.

> mention some of the bullet points

A big part of what makes templ so good is the developer experience through its syntax thats similar to JSX, IDE support  and, through code generation and compile time checks, performance and type safety.

For example, if we had misspelled Author earlier or typed it as lowercase in the template, it would not work but we wouldn't know until runtime.

Since the templates are already generated, it will lead to better performance compared to runtime parsing.

Composition and reusability, as you will see soon, also becomes easier leading to better maintainability.

Staying in one language as much as possible by helps us write better code faster, by reducing context switching.

So, let us rewrite what we have now to templ.

---

To create a view using templ you to create a file with the .templ extension which will be picked up by templ when you run `templ generate`.

Let's create the base layout (explain that the syntax is similar to a function):

```go
// views/base.templ
templ Base() {
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My Website</title>
      <link rel="stylesheet" href="./style.css">
      <link rel="icon" href="./favicon.ico" type="image/x-icon">
    </head>
    <body>
        { children...}
        <script src="index.js"></script>
    </body>
  </html>
}
```
Notice that we now spread a children variable inside the brackets. This will be injected by templ.

Another difference is that we no longer need double brackets, only one pair.

So, to create our Home view becomes fairly straightforward.
```go
// views/base.templ
type HomeViewData struct {
    Author string
    PublicationTime string
}
templ Home(data HomeViewData) {
    @Base() {
        <main>
            <h1>I'm a blog post written by {{ data.Author }} and released on {{ data.PublicationTime }}</h1>  
        </main>
    }
}
```

Lastly, we just need to update our handler and we're good to go.
```go
	http.HandleFunc(
		"GET /",
		func(w http.ResponseWriter, r *http.Request) {
			// return a response
			w.Header().Set("Content-Type", "text/html")
			if err := views.Home(views.HomeViewData{}).Render(r.Context, w); err != nil {
				// handle err
			}
		},
	)
```

---

## Episode 6

Show website with examples it has

Allows us to make request from everything (btns, divs, spans etC)

Allows more events to trigger these events

Provides us with all the REST operations (Update, Delet)

Allows us to be specific about what elements to update instead of the entire screen.

Allows us to create interactivity that aligns better with the MVC workflow.


## Episode 7

Should explain what a postgres install is 

Explain that you have a "Cluster" of many databases

Explain what a schema is

Explain what a view is

Explain what a migration is

### EP 7 Script
This video will give you a quick introduction to postgres so you have the basics down.

I don't want to go too deep into the inner workings of Postgres but instead give you the tools you need to run and manage your own database.

---

When you installed Postgres, you didn't only install a singular postgres database but a system that can have multiple databases running.

This means, that you can create as many individual databases as you want.

Typically, unless you have some very strict data access requirements, you have one database per project.

When working with databases in real applications, you typically create separate environments for the different stages of development. 

These environments are typically named: development, staging and production.

Let me explain why:

**Switc to Excalidraw**

- Development database (often called 'dev'): This is where you work while building your application. 

It's okay to make mistakes here, delete data, or start over. Think of it as your sandbox.

- Staging database (or 'staging'): This is like a dress rehearsal for your application. 

Once your changes work in development, you test them here in an environment that looks just like production. 

This helps catch issues before they affect real users.

- Production database (or 'prod'): This is where your actual user data lives. 

You want to be extra careful here because real people are using your application. 

Any mistakes could affect your users.

For example, if you're building a blog, you might have:
- blog_dev: Where you test new features
- blog_staging: Where you verify everything works before going live
- blog_production: Where your actual blog posts and user data live

This separation ensures you don't accidentally break things for real users while developing new features.

---

When you installed the postgres, it also came with two tools:
- psql
- pgAdmin

which can be used to interact with and manage postgres.

We can use psql to interact with our postgres databases through the terminal. 

But before we can do that we need to have a user with some credentials.

During installation a system user was created for you that's called postgres as well as a database and role with the same name.

But if you were to try and login with that user with psql right now, it wouldn't allow you.

Postgres uses, as a default on mac and linux, what is called peer authentication.

**Switch to excalidraw**

1. System User (Operating System Level):
   - When you installed Postgres, it created a system user called 'postgres'
   - This is like a special account on your computer that owns all the Postgres files

2. Postgres Role (Database Level):
   - In Postgres, instead of users, we have "roles"
   - A role can be thought of as either a database user or a group of database users
   - The 'postgres' role is automatically created and has full admin rights

3. How They Work Together:
   - Postgres uses "peer authentication" by default on Linux/Mac
   - This means it tries to match your system username with a Postgres role name
   - That's why we often create a Postgres role matching our system username
   - When they match, you can connect to Postgres without entering a password

For example, if your computer username is 'alex':
- Creating a matching Postgres role named 'alex'
- Creating a database named 'alex'
This allows you to just type 'psql' to connect instead of specifying credentials each time.

---

So before we can access postgres we need to switch to the postgres account.

```bash
sudo -i -u postgres
```

Now, we can interact with the system. Let's create a new superuser that matches our account name so we don't have to switch to postgres everytime.

```bash
createuser --pwprompt --superuser <username-here>
```

It's important that you use the name of your systems account.

We also need a database with the same name. Login to the new user:

```bash
create database <username-here> owner <username-here>
```
Now, exit and login into the psql with your user.
```bash
psql
```

and create the database for our project.

```bash
create database blog_dev
```

and connect to it:
```bash
/c blog_dev
```

---

We just created a superuser and an associated database.

What is a Superuser?
- A superuser can do anything in any database
- They can create/modify/delete databases, roles, and data
- They can override any access restrictions
- Think of it like having admin privileges on your computer

Security Implications:
1. Advantages:
   - Convenient for development on your local machine
   - Can fix problems without permission issues
   - Can grant permissions to other users

2. Risks:
   - If compromised, an attacker could access or destroy all your data
   - Could accidentally modify the wrong database
   - No restrictions means no safety net

Best Practices:
- Only use superuser for initial setup and maintenance
- Create regular users with limited permissions for your applications
- Never use superuser in production applications
- Keep superuser credentials extra secure

For development on your personal machine, using a superuser is fine. But when you deploy your application, you'll want to create a dedicated user with only the permissions it needs.

---

I want to touch on an important concept, schemas.

By default, we have a schema called 'public' which is where all the database tables lives. 

What is the Public Schema?
- A schema is like a folder for your database objects (tables, views, etc.)
- The public schema is automatically created in every new database
- All objects are created here unless you specify otherwise

Why is it the Default?
1. Historical Reasons:
   - It provides backwards compatibility with older versions
   - Many tools and applications expect it to exist

2. Convenience:
   - You don't need to specify the schema name in queries
   - Makes it easier for beginners to get started
   - Works well for simple applications

We can have multiple schemas in our database-this is often used if you want to have more separation of customer data.

Other advantages:
- Organizing large applications (e.g., 'auth' schema for user authentication)
- Multi-tenant applications (each customer gets their own schema)
- Separating system tables from application tables
- Managing permissions at a broader level

We're just going to use public for our application.

---

But we can't really do much at the moment, we need something to hold our data which is where tables come in.

The syntax is quite straigtforward, we simply go:

```bash
create table users (id int primary key not null);
```

If we run:
```bash
\d
```

We can now see that we have a table on the public schema called users.

We can insert data:
```bash
insert into users (id) values(1);
```

and query it:
```bash
select * from users;
```

as well as update and delete.

But, creating tables in our databases like this gets tedious and hard to maintain. So, as you will see later in the course we rely on migrations.

There are many ways to do migration, however, one of the most common ways is to create an 'up' and 'down' version.

The up version will be the thing we want to add/change/remove going forward while the down is to reverse the up, in case we make a mistake.

This is much easier to explain when we get to actually creating migrations.

You might also not want to rely on your terminal-I use a desktop app alled dBeaver, but tableplus is also a good candidate if you're on macOs.

## Episode 8
**Title**: Servers, routers and endpoints (how to make it sound more like cripples, bastards and broken things)

Should just, briefly, talk about web frameworks in Go (Echo, Gorilla, std library)

Gives us a lot of what we need to build web applications:
- registering and grouping endpoints
- adding middleware
- managing cors
- telemetry
- etc etc

Setup a simple router with echo and a server/http package.

Clarify terminology

### Episode 8 script

We're almost done with the tech stack walkrough.

I just want to touch on one more thing; that of servers, routers and endpoints.

Mainly to give you a quick overview of the options, and settle on the terminology.

We've already used the standard library to setup a basic server using `http.ListenAndServe` and defining some endpoints using `http.HandlerFunc`.

And we could stick with that and be fine.

However, there exist a few options in the Go ecosystem for web frameworks that combines all of this in one package and provides some extra features.

---

Some of those options are gorilla, fiber and echo and many more.

For a long time gorilla was the default choice but had trouble finding maintainers and was overtaken by other options. They have since gotten new maintainers and the project seems to be back on track.

Another popular one, fiber, is very similar to what you would be use to if you come from a node.js background. It's the fastest http engine in Go, according to them. But we will not be using it.

Fiber has however chosen to stray from the standard library a bit with so that the library is harder to use with the rest of the ecosystem.

In Go, you pass a context struct that has some information about the current request. This has many uses that we will not be going over but since fiber has chosen to use their own implementation, it gets harder to use it with libraries that do use the standard library's context package.

A general thing you will see is that Go developers tend to rely on the standard library as much as possible.

We will be using Echo in the course.

It provides just enough functionality so that we don't have to reinvent the wheel but also not get in our way.

Let's create a simple server and router using Echo.

---
To start any new Go project, we must initilize a go module which is done by typing `go mod init <name-here>`

To install dependencies, we can use the `go get` command followed by the package we want, so to install Echo we do:
`go get github.com/labstack/echo/v4`.

Next, let's create a `main.go` file.
```go
func main() {
    e := echo.New()
    
    e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
}
```

Which contains our router which we create with `ehco.New()` and then an endpoint that just returns hello world.

---

If you've checked the Echo documentation you know that they have an example that would now call `.Start()` on the router, which is fine.

However, I like to create a server struct using the `http` package from the standard library. 

Here we can add some settings like the address to listen on, our handlers, some timeouts etc.

```go
server := &http.Server{
    Addr: "0.0.0.0:8080",
    Handler: e,
    ReadTimeout: 30 * time.Second,
    WriteTimeout: 30 * time.Second,
}
```

Feel free to adjust these to your needs, these are just my standards.

---

Finally, we can call `ListenAndServe` on the server struct

```go
if err := server.ListenAndServe(); err != http.ServerClosed {
    log.Fatal(err)
}
```

and if we visit `http://localhost:8080` we should see "hello world".

A thing I've left out here is that you typically would want to gracefully shutdown a server.

This means that if the server receives a signal to stop, it will try to finish any on going requests, and shutdown after these are completed.

This is very nice whenever we make new deployments. We will touch on this when we get to the Going live module.

---

This was a very fast introduction to servers and routers in Go. 

We still need to cover middleware, security and so forth. This will come as we progress.

But for now, when ever I talk about a server and a router you should have a better idea of what I mean.
