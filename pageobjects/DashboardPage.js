class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body")
        this.productsText = page.locator(".card-body b")
        this.cart = page.locator('[routerlink="/dashboard/cart"]')
        this.orders = page.locator('i.fa.fa-handshake-o')
        //this.cartProducts = page.locator('div li').first()
        this.page = page
    }

    async selectProduct(productName) {
       const titles = await this.productsText.allTextContents()
        //console.log(titles)
        const count = await this.products.count()
        console.log(count)
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add to Cart").click()
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click()
        await this.page.locator("div li").first().waitFor();
    }

}
module.exports = {DashboardPage}