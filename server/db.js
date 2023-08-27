const mongoose = require('mongoose')


const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connect