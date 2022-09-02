const {test, expect} = require('@playwright/test')

test('Rahulshetty client App', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator('[id="userEmail"]').type('karikalan.example@gmail.com')
    await page.locator('[id="userPassword"]').type('Sachin@123')
    await page.locator("[value='Login']").click()
    //await page.waitForURL("https://rahulshettyacademy.com/client/dashboard/dash")
    await page.waitForLoadState("networkidle")
    const titles = await page.locator(".card-body b").allTextContents()
    //const titles = await page.locator("div h5 b").allTextContents()
    console.log(titles)


})
