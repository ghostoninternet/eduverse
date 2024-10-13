const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.status(200).send("Hello World!")
})

app.listen(8000, () => {
  console.log("Server start on http://localhost:8000")
})
