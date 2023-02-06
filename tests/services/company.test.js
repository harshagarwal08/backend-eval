const { Company } = require('../../database/models')
const services = require('../../src/services/companyServices')
const utils = require('../../src/utils/companyUtils')

describe('save data', () => {
  it('should save the data', async () => {
    const data = [{
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      company_sector: 'abc'
    }, {
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      company_sector: 'xyz'
    }]
    const spied = jest.spyOn(utils, 'getData').mockResolvedValue(data)
    const spied1 = jest.spyOn(utils, 'getCompanyDetails').mockResolvedValue({ data: { name: 'Company ABC', ceo: 'Some person name' } })
    const spied2 = jest.spyOn(utils, 'getSectorDetails').mockResolvedValue({
      data: [{
        companyId: 'ad36a7f5-7630-496e-8628-e70981179669',
        performanceIndex: [
          { name: 'abc', value: 0.5 },
          { name: 'xyz', value: 0.5 }
        ]
      }]
    })
    const spied3 = jest.spyOn(utils, 'getScore').mockReturnValue(67.45)
    const spied4 = jest.spyOn(Company, 'create').mockResolvedValue({
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      name: 'Company ABC',
      ceo: 'Some person name',
      company_sector: 'abc',
      score: 67.45
    })
    const spied5 = jest.spyOn(Company, 'findOne').mockResolvedValue({
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      name: 'Company ABC',
      score: 67.45
    })
    const urlLink = 'https://api.mocki.io/v1/9b9b9b9b'
    const result = await services.saveData(urlLink)

    expect(spied).toBeCalledWith(urlLink)
    expect(spied1).toBeCalledWith('ad36a7f5-7630-496e-8628-e70981179669')
    expect(spied2).toBeCalledWith('abc')
    expect(spied3).toBeCalledWith({
      companyId: 'ad36a7f5-7630-496e-8628-e70981179669',
      performanceIndex: [
        { name: 'abc', value: 0.5 },
        { name: 'xyz', value: 0.5 }
      ]

    })
    expect(spied4).toBeCalledWith({
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      name: 'Company ABC',
      ceo: 'Some person name',
      company_sector: 'abc',
      score: 67.45

    })
    expect(spied5).toBeCalledWith({
      where: {
        company_id: 'ad36a7f5-7630-496e-8628-e70981179669'
      },
      attributes: ['company_id', 'name', 'score']
    })
    expect(result).toEqual([{
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      name: 'Company ABC',
      score: 67.45
    }, {
      company_id: 'ad36a7f5-7630-496e-8628-e70981179669',
      name: 'Company ABC',
      score: 67.45
    }])
  })
})

describe('get sector wise companies', () => {
  it('should return the sector wise companies', async () => {
    const data = [{
      dataValues: {
        id: 'ad36a7f5-7630-496e-8628-e70981179668',
        name: 'Company ABC',
        ceo: 'Some person name',
        score: 67.45
      }
    }, {
      dataValues: {
        id: 'ad36a7f5-7630-496e-8628-e70981179668',
        name: 'Company DEF',
        ceo: 'Some person name',
        score: 62.45
      }
    }
    ]
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
    data[0].dataValues.ranking = 1
    data[1].dataValues.ranking = 2
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
