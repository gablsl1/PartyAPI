const mongoose = require('mongoose')
require('dotenv').config()

async function main() {
    try {
        mongoose.set('strictQuery', true)

        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2md5ew3.mongodb.net/?retryWrites=true&w=majority`)
    } catch(e) {
        console.log(`Erro: ${e}`)
    }
}

module.exports = main