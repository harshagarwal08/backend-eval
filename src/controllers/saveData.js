const services = require('../services/dataServices')

exports.saveData = async (req, res) => {
  const { urlLink } = req.body
  await services.saveData(urlLink)
}
