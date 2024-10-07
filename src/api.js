const utils = require('./utils/index')
const response = require('./response')

module.exports = {
    generateAddress: async (req, res) => {
        let token = req.body.token.toLowerCase();

        let func = utils[token];

        if (!func) {
            return response.fail(res, `${token}_not_supported`)
        }

        let data = await func.generateAddress()

        return response.success(res, data)
    },

    buildTransaction: async (req, res) => {
        let data = req.body;
        let token = data.token.toLowerCase();

        let func = utils[token];

        if (!func) {
            return response.fail(res, `${token}_not_supported`)
        }

        let tx = await func.buildTransaction(data);

        return response.success(res, {tx})
    }
}