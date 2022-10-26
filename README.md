# Section store

- full name
- email
- tel
- available balance
- otp
- otp expire at

# Cookie store

- JWT

# Tuition Collection

- student id
- tuition fee

# Student Collection

- student id
- username
- password
- fullname
- tel
- email
- available balance
- transaction history

# Transaction Collection

- transaction id
- payer
- pay for (student id)
- money
- created at
- status (optional)

# Logic

- When logged in, store student id in token
- When click on payment, server will go through protected middleware, server will have account owner info (full name, email, tel, available balance) to render in form
- When user enter target student id, server will find the user belong to that student id and have the targer info (full name, tuition fee <if fee <= 0 raise error >)
- Send otp via email and create new document in otp collection
- Enter otp then click OK
- Server will verify otp,
  => use mongodb transaction for implementation

only login return cookie
/payment -> check is exist cookie
check if section
/post -> check is exist cookie

# TODO

unit test
create transaction
