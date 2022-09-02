const {test,expect} = require("@playwright/test")

test(" @web Popup validation", async({page})=>
{
 await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
//  await page.goto("https://www.google.com/");
//  await page.goBack();
//  await page.goForward();
 await expect(page.locator("#displayed-text")).toBeVisible()
 await page.locator("#hide-textbox").click()
 await expect(page.locator("#displayed-text")).toBeHidden()
 //await page.pause()
 page.on('dialog', dialog => dialog.accept());
 await page.locator("#confirmbtn").click()
 await page.locator("#mousehover").hover()
 const framePage = page.frameLocator("#courses-iframe")
 //await framePage.locator("a[href*='learning-path']:visible").first().click()
 await framePage.locator("li a[href*='lifetime-access']:visible").click()
 //await framePage.locator(".container-fluid").waitFor({state:"attached", timeout:10000})
 const textCheck = await framePage.locator('//div[@class="text"]/h2[text()=" Happy Subscibers!"]').textContent()
 console.log(textCheck)
 console.log(textCheck.split(" ")[1])




})