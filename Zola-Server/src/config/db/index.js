import mongoose from 'mongoose'

async function connect() {
    try {
        await mongoose.connect('', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect to Database successfully!!!')
    } catch (err) {
        console.log('Connect failure!!!')
    }
}

export default { connect }
