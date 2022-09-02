class PaymentPage
{
 constructor(page)
 {
    this.cvvCode = page.locator('//div[text()="CVV Code "]/following-sibling::input')
    this.nameOnCard = page.locator('//div[text()="Name on Card "]/following-sibling::input')
    this.applyCoupon = page.locator('//div[text()="Apply Coupon "]/following-sibling::input')
    this.country = page.locator('[placeholder*="Country"]')
    this.countrySearchResults = page.locator('.ta-results')
    this.searchResultsButton = page.locator("button")
    this.page = page
}

async enterPaymentDetails()
{
    await this.cvvCode.fill("000")
    await this.nameOnCard.fill('Karikalan')
    await this.applyCoupon.fill('Diwali Code')
    
}
 async enterAddress()
 {
    await this.country.type('ind', { delay: 100 })
    await this.countrySearchResults.waitFor()
    const countriesResults = await this.searchResultsButton.count()
    console.log(countriesResults)
    for (let i = 0; i < countriesResults; i++) {
        if (await this.countrySearchResults.locator("button").nth(i).textContent() === " India") {
            await this.countrySearchResults.locator("button").nth(i).click();
            break;
        }
    }

 }

async placeOrder()
{
    await this.page.locator(".action__submit").click()
}
}
module.exports = {PaymentPage}