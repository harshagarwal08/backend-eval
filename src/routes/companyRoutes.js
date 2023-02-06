const express = require('express')

const Router = express.Router()

const controller = require('../controllers/companyControllers')

Router.post('/save', controller.saveData)
Router.get('/companies', controller.getSectorWise)
Router.patch('/companies/:companyId', controller.editCompanyDetails)

module.exports = { Router }
