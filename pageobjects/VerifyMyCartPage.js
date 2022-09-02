const {test, expect} = require('@playwright/test')
class VerifyMyCartPage
{
  
constructor(page)
{
    this.checkout = page.locator("text=Checkout")
    this.page = page
    
}

async verifyMyCartItem(productName)
{
    
    const bools = await this.getProductsLocator(productName).isVisible()
    console.log('bools is :', bools)
    expect(bools).toBeTruthy();
}

async checkoutTheItem()
{
    await this.checkout.click()

}

getProductsLocator(productName)
{
    return this.page.locator("h3:has-text('"+productName+"')")
}

}
module.exports ={VerifyMyCartPage}