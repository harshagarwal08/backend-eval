const services = require('../services/companyServices')
const { HTTPError } = require('../utils/errors')

exports.saveData = async (req, res) => {
  try {
    const { urlLink } = req.body
    const data = await services.saveData(urlLink)
    if (!data) throw new HTTPError('Error in saving data', 400)
    res.status(201).json(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

exports.getSectorWise = async (req, res) => {
  try {
    const { sector } = req.query
    const data = await services.getSectorWise(sector)
    if (!data) throw new HTTPError('Error in fetching data', 400)
    res.status(200).json(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

exports.editCompanyDetails = async (req, res) => {
  try {
    const { body } = req
    const { companyId } = req.params
    const data = await services.editCompanyDetails(companyId, body)
    if (!data) throw new HTTPError('Error in fetching data', 400)
    res.status(200).json(data)
  } catch (err) {
    if (err instanceof HTTPError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
