const express = require('express')

const app = express()

const PORT = 3000

app.use(express.json())

const { Router } = require('./src/routes/company')

app.use('/api', Router)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
