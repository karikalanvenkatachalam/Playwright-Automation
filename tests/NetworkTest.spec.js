const { test, expect, request } = require("@playwright/test")
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = { userEmail: "karikalan.example@gmail.com", userPassword: "Sachin@123" }   //- y it removed
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
const fakePayLoadOffers = {data:[],message:"No Orders"}
let response;
// test.beforeAll(async () => {
//     const apiContext = await request.newContext()
//     const apiutils = new APIUtils(apiContext,loginPayload)
//     response = await apiutils.createOrder(orderPayload) 
//     console.log('response :' ,response)


// })
//console.log('response :' ,response)

test('Inject Fake Response', async ({ page }) => {
    const apiContext = await request.newContext()
    const apiutils = new APIUtils(apiContext,loginPayload)
    response = await apiutils.createOrder(orderPayload) 
    console.log('response :' ,response)
   page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client");
    console.log(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${response.orderId}`)

    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${response.orderId}`,
    route => {
        const response = page.request.fetch(route.request())
        console.log('response')
        let body = fakePayLoadOffers
         route.fulfill(
            {
                response,
                body,
                
            }
            )}
    )
    await page.pause()
    // await page.waitForLoadState("domcontentloaded")
    // await page.locator('#products').waitFor({ state: "visible", timeout: 9000 })
    await page.locator('i.fa.fa-handshake-o').click()
    await page.locator("tbody").waitFor();

})