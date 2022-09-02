const { test, expect } = require('@playwright/test')
//const {customtest} = require('../utils/test-base')
const { LoginPage } = require('../pageobjects/LoginPage')
const { DashboardPage } = require('../pageobjects/DashboardPage')
const { VerifyMyCartPage } = require('../pageobjects/VerifyMyCartPage')
const { PaymentPage } = require('../pageobjects/PaymentPage')
const { orderreviewpage } = require('../pageobjects/orderreviewpage')
const { orderhistorypage } = require('../pageobjects/orderhistorypage')
const { customtest } = require('../utils/test-base')
//test.describe.configure({mode: 'parallel'})
//test.describe.configure({mode:'serial'})

const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))
for (const data of dataset)
{
test(` @web E2E Place Order ${data.productName}`, async ({ page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.validLogin(data.username, data.password)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.selectProduct(data.productName)
    await dashboardPage.navigateToCart()
    const verifyMyCartPage = new VerifyMyCartPage(page)
    await verifyMyCartPage.verifyMyCartItem(data.productName)
    await verifyMyCartPage.checkoutTheItem()

    const paymentPage = new PaymentPage(page)
    await paymentPage.enterPaymentDetails()
    await paymentPage.enterAddress()
    await paymentPage.placeOrder()

    const orderReview = new orderreviewpage(page)
    await orderReview.checkSuccessMessage()
    const finalOrderid = await orderReview.getOrderId()
    console.log('finalOrderid is :', finalOrderid)

    const orderHistoryPage = new orderhistorypage(page)
    await orderHistoryPage.goToOrdersHistory()
    await orderHistoryPage.getTotalOrders()
    const viewButton = await orderHistoryPage.getViewButton(finalOrderid)
    await orderHistoryPage.clickViewButton(viewButton)
    const orderid = await page.locator('.col-text').textContent()
    await expect(finalOrderid.includes(orderid)).toBeTruthy()
    const emailIdViewSummary = (await page.locator("(//div[text()=' Delivery Address ']/following-sibling::p)[1]").textContent()).trim()
    console.log(emailIdViewSummary)

})
};
customtest('E2E Place Order', async ({ page, testDataForOrder}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.selectProduct(testDataForOrder.productName)
    await dashboardPage.navigateToCart()
    const verifyMyCartPage = new VerifyMyCartPage(page)
    await verifyMyCartPage.verifyMyCartItem(testDataForOrder.productName)
    await verifyMyCartPage.checkoutTheItem()

})




