const { test, expect } = require("@playwright/test")

class FacPage {
  constructor(newPage) {

    this.faAppIcon = this.page.locator('img.fa-app-icon')
    this.AddNewAgreement = page.locator("//div[@class = 'fa-dropdown-group']//button[@class = 'fa-button fa-button--brand']")
    this.page = newPage
    //this.riDirect - page.locator('button[class$="fa-button fa-button--brand"]').nth(1)

  }

  async UiVerify() {
    //await expect(this.page.locator('img.fa-app-icon')).toBeVisible()
    await expect(this.page.locator('h5.fa-main-header__subtitle')).toContainText('Frame Agreement Negotiation Console')
    await expect(this.page.locator('h1.fa-main-header__title')).toContainText('Account1')
    await expect(this.page.locator("button[class='fa-button fa-button--brand'] span")).toContainText('Add new')
  }

  async createFrameAgreement() {
    
    await this.page.locator("//div[@class = 'fa-dropdown-group']//button[@class = 'fa-button fa-button--brand']").click()
    await this.page.locator('#createnewchild').click()
    await this.page.locator("//div[.='Agreement name']//input").fill('Test1')
    await this.page.locator("//button[normalize-space()='Save']").click()
    await this.page.locator("//div[@class='toaster-container']").isVisible()

  }

}
module.exports = { FacPage }