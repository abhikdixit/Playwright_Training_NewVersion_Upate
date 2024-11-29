const { test, expect }= require('@playwright/test')

test.describe('Create Booking', () => {
    const baseUrl = 'https://restful-booker.herokuapp.com'
    var token
    var id
  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
      },
      data: {
        "username" : "admin",
        "password" : "password123"
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
    token = responseBody.token
    console.log(token)
   })

  test('POST Request - Create Booking', async ({ request }) => {
    const response = await request.post(`${baseUrl}/booking`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
      data: {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    console.log(responseBody)
    id=responseBody.bookingid
    expect(responseBody.booking.firstname).toBe("Jim")
    //const token = responseBody.token
    console.log(id)
  })

  test('PUT Request - Update Booking', async ({ request }) => {
    const response = await request.put(`${baseUrl}/booking/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
      data: {
        "firstname" : "Abhi",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    console.log(responseBody)
    expect(responseBody.firstname).toBe("Abhi")
    //const token = responseBody.token
    //console.log(token)
  })

})