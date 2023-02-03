const { Company } = require('../../database/models')
const services = require('../../src/services/companyServices')

describe('get sector wise companies', () => {
  it('should return the sector wise companies', async () => {
    const data = [{
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company ABC',
      ceo: 'Some person name',
      score: 67.45,
      ranking: 1
    }, {
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company DEF',
      ceo: 'Some person name',
      score: 62.45,
      ranking: 2
    }]
    const spied = jest.spyOn(Company, 'findAll').mockResolvedValue(data)
    const sector = 'abc'
    const result = await services.getSectorWise(sector)

    expect(spied).toBeCalledWith({
      where: {
        company_sector: sector
      },
      attributes: ['company_id', 'name', 'ceo', 'score'],
      order: [['score', 'DESC']]
    })

    expect(result).toEqual(data)
  })
})

describe('edit company details', () => {
  it('should edit the company details', async () => {
    const id = 'ad36a7f5-7630-496e-8628-e70981179668'
    const data = {
      name: 'New Name',
      ceo: 'Changed person name'
    }
    const spied = jest.spyOn(Company, 'update').mockResolvedValue(data)
    const result = await services.editCompanyDetails(id, data)

    expect(spied).toBeCalledWith({ ...data }, {
      where: {
        company_id: id
      }
    })

    expect(result).toEqual(data)
  })
})
