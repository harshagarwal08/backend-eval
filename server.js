const express = require('express')

const app = express()

const PORT = 3000

app.use(express.json())

const { apiRouter } = require('./src/routes/')

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
