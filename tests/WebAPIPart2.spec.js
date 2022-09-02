const { test, expect } = require('@playwright/test')
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator('[id="userEmail"]').type('karikalan.example@gmail.com')
    await page.locator('[id="userPassword"]').type('Sachin@123')
    await page.locator("[value='Login']").click()
    await page.waitForLoadState("networkidle")
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })

})
test('Rahulshetty client App Test case 1', async ({ }) => {

    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client")
    await page.waitForLoadState("networkidle")
    const titles = await page.locator(".card-body b").allTextContents()
    //const titles = await page.locator("div h5 b").allTextContents()
    console.log(titles)


})

test('First E2E Test, Test case 2', async ({ }) => {

    const productName = 'zara coat 3';
    const page = await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const cartSection = page.locator(".items.even.ng-star-inserted")
    const wholeCart = page.locator("div.cart")
    const buyNowButton = page.locator("div.cart ul li div div:nth-child(3) button.btn.btn.btn-primary")
    const buyNowButtonsOnCartPage = wholeCart.locator("button.btn.btn.btn-primary")
    const cardForm = page.locator("form")
    await page.waitForLoadState("domcontentloaded")
    await page.locator('#products').waitFor({ state: "visible", timeout: 4000 })
    const titles = await page.locator(".card-body b").allTextContents()
    const count = await products.count()

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {

            await products.nth(i).locator("text= Add to Cart").click()
            break;
        }
    }
    //check the added product is present or not in the cart
    await page.locator('[routerlink="/dashboard/cart"]').click()
    await page.locator("div li").first().waitFor();
    const bools = await page.locator("h3:has-text('zara coat 3')").isVisible();
    //console.log(bools)
    expect(bools).toBeTruthy();
    //after that we need to click the checkout in the cartpage
    await page.locator("text=Checkout").click()
    //After checkout fill the personal info and card info
    // await cardForm.locator("form input.txt.text-validated").fill("234523452345")
    // await cardForm.locator("form select.input.ddl").nth(1).selectOption("05")
    // await cardForm.locator("form select.input.ddl").nth(2).selectOption("05")
    await cardForm.locator('//div[text()="CVV Code "]/following-sibling::input').fill("000")
    await cardForm.locator('//div[text()="Name on Card "]/following-sibling::input').fill('Karikalan')
    await page.locator('//div[text()="Apply Coupon "]/following-sibling::input').fill('Diwali Code')
    const cvvCode = await cardForm.locator('//div[text()="CVV Code "]/following-sibling::input').textContent()
    console.log(cvvCode)
    //Handling the autosuggestion dropdown, Select Country dropdown
    await page.locator('[placeholder*="Country"]').type('ind', { delay: 100 })
    const dropDown = page.locator('.ta-results')
    await dropDown.waitFor()
    const optionsInDropDown = await dropDown.locator("button").count()
    //console.log(optionsInDropDown)
    for (let i = 0; i < optionsInDropDown; i++) {
        if (await dropDown.locator("button").nth(i).textContent() === " India") {

            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    //console.log(emailId)
    //Here, we need to check whether the login email and email in the website is correct or not, need to check
    //await expect(page.locator("div.user__name input[type='text']").).toEqual(emailId1)
    //process.exit()
    //After that, need to check the 'Thank you' message is diplyaed or not
    await page.locator(".action__submit").click()
    expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order.")
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderId)
    const finalOrderId = orderId.replaceAll('|', '').trim()
    console.log(finalOrderId)
    await page.locator('i.fa.fa-handshake-o').click()
    await page.locator("tbody").waitFor();
    const totalOrders = await page.locator('.ng-star-inserted tbody tr th').count()
    console.log(totalOrders)
    // //const viewButtons = page.locator('.btn.btn-primary');
    // //const allOrdersID = await page.locator('.ng-star-inserted tbody th').textContent()
    // //console.log(allOrdersID)
    // for(let i=0;i<totalOrders;i++){
    //     // const allOrdersID = await page.locator('.ng-star-inserted tbody th').nth(i).textContent()
    //     // console.log(allOrdersID)
    // if(await page.locator('.ng-star-inserted tbody tr th').nth(i).textContent()===orderId){
    //     await page.locator('.ng-star-inserted tbody tr th').nth(i).
    // }
    // }
    //await page.locator('//th[text()="62d63896e26b7e1a10f2662e"]/following-sibling::td[5]').waitFor({timeout:4000});
    /////////Now, want to check the order id is present on the my orders page and need to click the respective view button
    /////////already we got an order id on row no 78. so no need to use for loops
    const viewButtonForMyOrderId = page.locator('//th[text()="' + finalOrderId + '"]/following-sibling::td[5]/button')
    await page.locator('//th[text()="' + finalOrderId + '"]/following-sibling::td[5]/button').click()
    ////////now check the order id on the view summary page and our booking order id is match or not.
    const orderDetails = await page.locator('.col-text').textContent()
    await expect(orderId.includes(orderDetails)).toBeTruthy()
    const emailIdViewSummary = (await page.locator("(//div[text()=' Delivery Address ']/following-sibling::p)[1]").textContent()).trim()
    console.log(emailIdViewSummary)




})
