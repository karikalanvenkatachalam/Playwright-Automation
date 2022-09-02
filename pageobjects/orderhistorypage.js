const {test, expect} = require('@playwright/test')
class orderhistorypage {
    constructor(page) {
        this.page = page
        this.ordersButton = page.locator('i.fa.fa-handshake-o')
        this.totalOrders = page.locator('.ng-star-inserted tbody tr th')
        //this.viewButton = viewButton
    }

    async goToOrdersHistory() {
        await this.page.locator('i.fa.fa-handshake-o').click()
        await this.page.locator("tbody").waitFor();
    }

    async getTotalOrders() {
        const totalOrders = await this.page.locator('.ng-star-inserted tbody tr th').count()
        console.log('totalOrders is :', totalOrders)
    }

    async getViewButton(finalOrderid)
    {
        const viewButton = await this.page.locator('//th[text()="' + finalOrderid + '"]/following-sibling::td[5]/button')
        console.log('ViewButton is :', viewButton)
        return viewButton;

   
 }

    async clickViewButton(viewButton) {

        await viewButton.click()
    }
}
module.exports = { orderhistorypage }