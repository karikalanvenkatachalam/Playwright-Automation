class LoginPage{

  constructor(page)
  {
     this.page = page,
     this.userName = page.locator('[id="userEmail"]'),
     this.passWord = page.locator('[id="userPassword"]'),
     this.signInButton = page.locator("[value='Login']")
   

  }

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client")
} 

async validLogin(username, password)
{
  await this.userName.type(username)
  await this.passWord.type(password)
  await this.signInButton.click()
  await this.page.waitForLoadState("domcontentloaded")
  await this.page.locator('#products').waitFor({ state: "visible", timeout: 3000 })
}





}
module.exports = {LoginPage}