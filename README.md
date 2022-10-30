# Create sample data

- Run "npm run create-sample-data <options>" with options are: --import, --delete (if you run without option default it will perform reset data)

# Transaction API

- GET /transactions -> render UI
- POST /transactions -> create a new transaction (data required: amount, studentId)
- POST /exec-transaction -> execute transaction (data required: otp)
- GET /transactions/:transactionId -> render UI
- GET /transactions/history -> render UI

# Problems

- cannot create transaction with with same transactor (because of unique transactor)
- transaction error but still update
