const express = require('express')

const apiRouter = express.Router()

const dataController = require('../controllers/saveData')

apiRouter.post('/save', dataController.saveData)

module.exports = { apiRouter }
