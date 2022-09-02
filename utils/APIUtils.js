class APIUtils
{
    constructor(apiContext,loginPayload){
        this.apiContext=apiContext,
        //this.orderPayload=orderPayload,
        this.loginPayload=loginPayload
    }
async getToken(){
    const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload }
    )
    const loginResponseJson = await loginResponse.json()
    const token = loginResponseJson.token
    console.log(token)
    return token;
}

async createOrder(orderPayload){
    let response = {};
    response.token = await this.getToken()
    const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayload,
        headers: {
            'Authorization': response.token,
            'Content-Type': 'application/json'
        },
    })
const orderReponseJson = await orderResponse.json()
console.log(orderReponseJson)
const orderId = await orderReponseJson.orders[0]
console.log(orderId)
response.orderId = orderId
return response;
}
}
module.exports = {APIUtils}