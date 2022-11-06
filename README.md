# Steps to run our app

- First, you need to be ensure that Nodejs has been installed in your computer
- Open the terminal, run "npm install" to install all dependencies
- Next, run "npm run create-sample-data <options>" with options are: --import, --delete (if you run without option default it will reset data)
- Open localhost:3000

# Basic flow of the app

1. The first time you access the home page, you will be redirected to the login page, and you have to sign in to use the app
2. After signing in, you will be redirected to the home page
3. Here, you will see

* Information about your account: name, phone, email, current balance
* Pay tuition button
* Logout button

4. You have 2 options
* Case "Logout button", you will be redirected to the login page
* Case "Pay tuition button", you will be redirected to the payment page

5. In this page, you will have 4 steps to create payment
* 5.1. You will see your information again
* 5.2. Enter a student ID, then his/her name and tuition will automatically be filled in
* 5.3. You will check some transaction information like transactor, balance, student name, tuition fee
* 5.4. Once you click "Pay button", you will receive an OTP code in your email and be redirected to the OTP page after some seconds
6. In here, you will enter your OTP code in order to make payment or you can obtain another one
7. Once you enter your OTP code and click "Submit", if your OTP code is valid, your transaction will be executed and
   you will receive a email notification to confirm that your payment has been successful

# Endpoints in the app

- Endpoints which are not mentioned who is allowed to access are for signed-in user

| Endpoint     | Method |                                                                   Description |
| ------------ | :----: |: ---------------------------------------------------------------------------- |
| /            |  GET   |                                                              Render home page |
| /auth/login  |  GET   |                                        Render login page (for anonymous user) |
| /auth/login  |  POST  |                                             Handle login (for anonymous user) |
| /auth/logout |  GET   |                                                                        Logout |
| /payment     |  GET   |                                                           Render payment page |
| /payment     |  POST  | handle payment request,create pending transaction, send otp to client's email |
| /otp         |  GET   |                                                               Render OTP page |
| /resend-otp  |  GET   |                 invalidate current OTP and send another one to client's email |
| /otp         |  POST  |  verify OTP and make payment if OTP and all required conditions are satisfied |
| /student/:id |  GET   |                                               extract student's name, tuition |
