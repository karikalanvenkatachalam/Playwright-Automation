const { test, expect, request } = require("@playwright/test")
const {APIUtils} = require('../utils/APIUtils')
const loginPayload = { userEmail: "karikalan.example@gmail.com", userPassword: "Sachin@123" }   //- y it removed
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiutils = new APIUtils(apiContext,loginPayload)
    response = await apiutils.createOrder(orderPayload) 
    console.log('response :' ,response)


})



test('Smoke Test using api', async ({ page }) => {
    
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    const cartSection = page.locator(".items.even.ng-star-inserted")
    const wholeCart = page.locator("div.cart")
    const buyNowButton = page.locator("div.cart ul li div div:nth-child(3) button.btn.btn.btn-primary")
     const buyNowButtonsOnCartPage = wholeCart.locator("button.btn.btn.btn-primary")
    const cardForm = page.locator("form")
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)


    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState("domcontentloaded")
    await page.locator('#products').waitFor({ state: "visible", timeout: 9000 })
    const titles = await page.locator(".card-body b").allTextContents()
    //console.log(titles)
    await page.locator('i.fa.fa-handshake-o').click()
    await page.locator("tbody").waitFor();
    const totalOrders = await page.locator('.ng-star-inserted tbody tr th').count()
    console.log(totalOrders)
 
    const viewButtonForMyOrderId = page.locator('//th[text()="' + response.orderId + '"]/following-sibling::td[5]/button')
    await page.locator('//th[text()="' + response.orderId + '"]/following-sibling::td[5]/button').click()
    ////////now check the order id on the view summary page and our booking order id is match or not.
    const orderDetails = await page.locator('.col-text').textContent()
    await expect(response.orderId.includes(orderDetails)).toBeTruthy()
    const emailIdViewSummary = (await page.locator("(//div[text()=' Delivery Address ']/following-sibling::p)[1]").textContent()).trim()
    console.log(emailIdViewSummary)
    //await expect(emailId1.includes(emailIdViewSummary)).toBeTruthy()
})