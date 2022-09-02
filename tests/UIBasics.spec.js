const {test, expect} = require('@playwright/test')
//const {expect} = require('../playwright.config')

test('browser context playwright test', async ({browser}) =>{


const context = await browser.newContext()
const page = await context.newPage('')
const userName = page.locator('#username')
const password = page.locator("[name='password']")
const signIn = page.locator("#signInBtn")
const cardTitles = page.locator("div.card-body a")
await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/")
//console.log(await page.title())
await userName.type('rahulshetty')
await password.type('learning')
await signIn.click()
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText('Incor')
//type and fill
await userName.fill("")
await userName.fill("rahulshettyacademy")
//race condition
await Promise.all(
[
    page.waitForNavigation(),
    signIn.click(),

])

// console.log(await cardTitles.first().textContent())
// console.log(await cardTitles.nth(1).textContent())
const allTitles = await cardTitles.allTextContents()
const sachin = []
for (let i =0; i<allTitles.length;i++)
{
    if (allTitles[i] == 'iphone X'){
        await expect(allTitles[i]).toEqual("iphone X")
    }
}

console.log(allTitles)
})
///////////////
test('page playwright test', async ({page}) =>{

    await page.goto("https://www.google.com/")
    console.log(await page.title())
    //get the title and put the assertion to check the title is present or not
    await expect(page).toHaveTitle('Google')

})
////////////////////
// test('HDFC playwright Test', async ({page}) => {

//     await page.goto("https://netbanking.hdfcbank.com/netbanking/")
//     await page.pause(2000)
//     await page.locator('.form-control.text-muted').type('62139765')
//     await page.locator(".btn.btn-primary.login-btn").click()
//     await page.locator("#fldPasswordDispId").type('Testsachin')
//     await page.locator('[ondblclick="return fLogon()"]').click()


//})
test('UI Controls', async ({page}) => {
    await page.goto("https://www.rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');
    await page.locator('#username');
    await page.locator("[name='password']");
    await page.locator("select.form-control").selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    //console.log(await page.locator(".radiotextsty").last().isChecked())
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
   await page.locator("#terms").uncheck()
   console.log(await page.locator("#terms").isChecked())
   expect(await page.locator("#terms").isChecked()).toBeFalsy()
   await expect(documentTitle).toHaveAttribute("class","blinkingText")
    //await page.pause();
})

test('Child window handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage('');
    const userName = page.locator('#username');
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all(
        [
          context.waitForEvent('page'),
          documentLink.click(),
        ]  )
    const text = await newPage.locator(".im-para.red").textContent();
    const arrayText = text.split('@');
    const domainName = arrayText[1].split(' ')[0];
    console.log(domainName);
    await userName.type(domainName)
    console.log(await page.locator('#username').textContent())

})


  
    //await page.locator(documentTitle).click()





