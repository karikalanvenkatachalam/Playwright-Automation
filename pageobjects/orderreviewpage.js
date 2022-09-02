const {test, expect} = require('@playwright/test')
class orderreviewpage
{
 constructor(page)
 {
   this.successMessage = page.locator('.hero-primary')
   this.orderId = page.locator('(//tr[@class="ng-star-inserted"]//td[@class="em-spacer-1"]/label)[1]')
   this.page = page

}
async checkSuccessMessage()
{
    await expect(this.successMessage).toContainText('Thankyou for the order.')
}

async getOrderId()
{
   const orderId = await this.orderId.textContent()
    console.log('orderId is : ', orderId)
    const finalOrderId = await orderId.replaceAll('|', '').trim()
    console.log(finalOrderId)
    return finalOrderId
}
}
module.exports = {orderreviewpage}