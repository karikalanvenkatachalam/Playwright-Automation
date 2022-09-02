//const { Connection } = require('jsforce')
const { test, expect } = require("@playwright/test")
export class AccountPage {

    constructor(page) {
        this.page = page



    }

    async goToAccount() {
        this.accountTab = this.page.locator('li a[title="Accounts Tab"]')
        this.accountLink = this.page.locator('th a[href$="/0014I00001qHSEv"]')
        this.famButton = this.page.locator('[value ="FAM_Custom2"]')
        await this.accountTab.click()
        await this.accountLink.click()
        await this.famButton.first().click()
    }

}
//module.exports = { GoToFamPage }