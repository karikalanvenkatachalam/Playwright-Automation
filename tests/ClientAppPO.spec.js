const {test, expect} = require('@playwright/test')
const {LoginPage} = require('../pageobjects/LoginPage')

test('Rahulshetty client App login @web', async ({page}) => {
    const username = 'karikalan.example@gmail.com'
    const password = 'Sachin@123'
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.validLogin(username,password)
    await page.pause()
    await page.waitForLoadState("networkidle")
    const titles = await page.locator(".card-body b").allTextContents()
    //const titles = await page.locator("div h5 b").allTextContents()
    console.log(titles)

})

