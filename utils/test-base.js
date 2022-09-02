const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            productName: "adidas original",
            username: "karikalan.example@gmail.com",
            password: "Sachin@123"
        }
    }
)