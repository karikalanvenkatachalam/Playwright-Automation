const {test, expect} = require('@playwright/test')
class ordersummarypage
{
constructor(page)
{
   this.orderid = page.locator('.col-text')
   this.page = page
   this.emailId = page.locator("(//div[text()=' Delivery Address ']/following-sibling::p)[1]")


}
async verifyOrderid(orderid)
{
    const orderid = await orderid.tex
}




}
module.exports = {ordersummarypage}