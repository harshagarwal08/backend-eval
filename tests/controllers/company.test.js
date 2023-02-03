// const controllers = require('../../src/controllers/company')
// const services = require('../../src/services/company')

describe('creating database', () => {
  it('should fetch the data and create the database', async () => {
    const data = [{
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company ABC',
      score: 67.45
    }, {
      id: 'f6827fd2-656b-4264-b0cf-f449ab7a131d',
      name: 'Company DEF',
      score: 52.45
    }]
    jest.spyOn('services', services.saveData).mockResolvedValue(data)

    const mockReq = {
      body: {
        urlLink: 'http://abc.com'
      }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await controllers.saveData(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.json).toBeCalledWith(data)
  })
})

describe('get sector wise data', () => {
  it('should get the data of a particular sector', async () => {
    const data = [{
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company ABC',
      ceo: 'Some person name',
      score: 67.45
    }, {
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company DEF',
      ceo: 'Some person name',
      score: 62.45
    }]
    jest.spyOn('services', services.getSectorWise).mockResolvedValue(data)

    const mockReq = {
      query: {
        sector: 'abc'
      }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await controllers.getSectorWise(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.json).toBeCalledWith(data)
  })
})

describe('edit company details', () => {
  it('should edit the details of a company', async () => {
    const data = [{
      id: 'ad36a7f5-7630-496e-8628-e70981179668',
      name: 'Company ABC',
      ceo: 'Changed name',
      score: 67.45
    }]
    jest.spyOn('services', services.editCompanyDetails).mockResolvedValue(data)

    const mockReq = {
      params: {
        company_id: 'ad36a7f5-7630-496e-8628-e70981179668'
      },
      body: {
        ceo: 'Changed name'
      }
    }
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await controllers.editCompanyDetails(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.json).toBeCalledWith(data)
  })
})
