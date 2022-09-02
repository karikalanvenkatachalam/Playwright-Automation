const { Connection } = require('jsforce')
const { test, expect } = require("@playwright/test")

class Org {

    constructor(page) {
        this.page = page
        //this.popup = page.locator('#tryLexDialogX')

    }
    async login() {
        console.log('loggin in ..')
        const connection = new Connection({
            instanceUrl: "https://kari-test.my.salesforce.com/",
            accessToken: "00D4I000000fXhV!AQYAQI3baZxZbmsDVQgHLrU9mr.gEu7kkBBwHZtmGua0fmJ.jT9eQUMHzGM_1yQ1aMf0VeBVotQbvZFsuyHTpOOxfPjscZsU",

        })
        try {
            await this.page.goto(`${connection.instanceUrl}/secur/frontdoor.jsp?sid=${connection.accessToken}`);  //this url will append the access token with our instance Url. our org designed like this
        } catch (error) {
            console.log('login failed due to ', error.message)
        }

        const url = this.page.url();
        if (url.includes('lightning')) {
            await this.switchToClassic()
        }
        const popup = this.page.locator('#tryLexDialogX')
        if (await popup.isVisible()) {
            await popup.click()
        }

    }

   
    
   

    async switchToClassic() {
    console.log('switching to classic..')
    await this.page.locator('//div[@style ="background-color: #65CAE4"]').first().click()
    await this.page.locator('(//div[@class="profile-card-footer"]/a)[1]').click()
}
}
module.exports = { Org }