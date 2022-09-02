class FamLoginPage
{
 constructor(page)
 {
    this.page = page
    this.userName = page.locator('#username')
    this.passWord = page.locator('#password')
    this.loginButton = page.locator('#Login')
}
async goTo()
{
await this.page.goto('https://login.salesforce.com/')
}
async loginPage()
{
await this.userName.fill('kv_fam2@test1.com')
await this.passWord.fill('Ch@nge1t990')
await this.loginButton.click()
}
async switchToClassic()
{
    await this.page.locator('//div[@style ="background-color: #65CAE4"]').first().click()
    await this.page.locator('(//div[@class="profile-card-footer"]/a)[1]').click()
}

}
module.exports = {FamLoginPage}