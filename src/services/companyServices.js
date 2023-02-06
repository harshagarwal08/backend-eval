/* eslint-disable camelcase */
const axios = require('axios')
const csvToJson = require('csvtojson')

const { Company } = require('../../database/models')

const saveData = async (urlLink) => {
  const response = await axios.get(urlLink, { responseType: 'blob' })
  const file = response.data
  const data = await csvToJson().fromString(file.toString())
  const allCompanies = []
  for (const company of data) {
    const { company_id, company_sector } = company
    const getCompanyDetails = await axios.get(`http://54.167.46.10/company/${company_id}`)
    const companyDetails = getCompanyDetails.data
    const getSectorDetails = await axios.get(`http://54.167.46.10/sector?name=${company_sector}
    `)

    const sectorDetails = getSectorDetails.data
    const data = sectorDetails.find(sector => sector.companyId === company_id)
    const scoringData = data.performanceIndex.reduce((acc, scores) => {
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
    const companyScore = Number((scoringData / 4).toFixed(2))
    const { name, ceo } = companyDetails
    const companyData = {
      company_id,
      name,
      ceo,
      company_sector,
      score: companyScore
    }

    await Company.create(companyData)

    const response = await Company.findOne({
      where: { company_id },
      attributes: ['company_id', 'name', 'score']
    })
    allCompanies.push(response)
  }
  return allCompanies
}

const getSectorWise = async (sector) => {
  const sectorData = await Company.findAll({
    where: {
      company_sector: sector
    },
    attributes:
     ['company_id', 'name', 'ceo', 'score'],
    order: [
      ['score', 'DESC']
    ]
  })
  for (const company of sectorData) {
    company.dataValues.ranking = sectorData.findIndex(data => data.company_id === company.company_id) + 1
  }
  return sectorData
}

const editCompanyDetails = async (company_id, body) => {
  return await Company.update({
    ...body
  }, {
    where: {
      company_id
    }
  })
}

module.exports = { saveData, getSectorWise, editCompanyDetails }
