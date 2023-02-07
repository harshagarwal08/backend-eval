/* eslint-disable camelcase */
const axios = require('axios')
const csvToJson = require('csvtojson')

const getData = async (urlLink) => {
  const response = await axios.get(urlLink, { responseType: 'blob' })
  const file = response.data
  return csvToJson().fromString(file.toString())
}
const getCompanyDetails = async (company_id) => await axios.get(`http://localhost:4000/company/${company_id}`)

const getSectorDetails = async (company_sector) => await axios.get(`http://localhost:4000/sector?name=${company_sector}
`)
const getScore = (data) => {
  const score = data.performanceIndex.reduce((acc, scores) => {
    if (scores.key === 'cpi') {
      acc += scores.value * 10
    }
    if (scores.key === 'cf') {
      acc += scores.value / 10000
    }
    if (scores.key === 'mau') {
      acc += scores.value * 10
    }
    if (scores.key === 'roic') {
      acc += scores.value
    }
    return acc
  }, 0)
  return Number((score / 4).toFixed(2))
}

module.exports = { getData, getCompanyDetails, getSectorDetails, getScore }
