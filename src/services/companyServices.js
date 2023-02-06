/* eslint-disable camelcase */
const utils = require('../utils/companyUtils')

const { Company } = require('../../database/models')

const saveData = async (urlLink) => {
  const data = await utils.getData(urlLink)
  const allCompanies = []

  for (const company of data) {
    const { company_id, company_sector } = company
    const getCompanyDetails = await utils.getCompanyDetails(company_id)
    const companyDetails = getCompanyDetails.data
    const getSectorDetails = await utils.getSectorDetails(company_sector)
    const sectorDetails = getSectorDetails.data
    const data = sectorDetails.find(sector => sector.companyId === company_id)
    const score = utils.getScore(data)
    const { name, ceo } = companyDetails
    const companyData = {
      company_id,
      name,
      ceo,
      company_sector,
      score
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
