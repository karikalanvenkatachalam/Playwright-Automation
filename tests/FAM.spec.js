const { test, expect, page } = require("@playwright/test")
//const {FamLoginPage} = require('../pageobjects/FamLoginPage')
const { Org } = require('../pageobjects/Org')
const { AccountPage } = require('../pageobjects/AccountPage')
const { FacPage } = require('../pageobjects/FacPage')
let webContext;
let newPage;
// test.describe.serial('Smoke Testing', () => {
//   let page;
//   test.beforeAll(async ({ browser }) => {
//     page = await browser.newPage();

//   });

//   test.afterAll(async () => {
//     await page.close();
//   });


  test("Verify the login is successfull and go to FAM Page", async ({browser}) => {
    
    const context = await browser.newContext()
    const page = await context.newPage()
    const org = new Org(page)
    await org.login()
    await page.waitForEvent('domcontentloaded')
    console.log(await page.title())
    expect(await page.title()).toEqual('Salesforce - Enterprise Edition')
    const fampage = new AccountPage(page)
    newPage = await Promise.all(
      [
        context.waitForEvent('page'),
        await fampage.goToAccount()
      ]  )
   const uiLabelsButtons = new FacPage(newPage)
   await uiLabelsButtons.UiVerify()
    // await context.storageState({path:'state.json'})
    // webContext = await browser.newContext({storageState: 'state.json'})
  })

  test("goto FAM Page", async ({browser}) => {
    const context = browser.newContext()
    const page = await context.newPage()
    const fampage = new AccountPage(page)
    newPage = await Promise.all(
      [
        context.waitForEvent('page'),
        await fampage.goTo()
      ]  )
    
  })

// test ('Verify the FAC labels and buttons on FAC Page', async ({page}) =>
// {
//    const page = newPage
//    const uiLabelsButtons = new FacPage(page)
//    await uiLabelsButtons.UiVerify()
   

// })
// test('Create New FA', async ({}) =>
// {
//   const faCreation = new FacPage(page)
//   await faCreation.createFrameAgreement()

// })

// })

// test('verify the new FA is created', async ({browser}) => {
//     await facPage.createFrameAgreement()
//     await newPage.waitForTimeout(7000)
//     const newFa = new FacPage(browser)
//     await newFa.createFrameAgreement()

// })













