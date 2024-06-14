import mongoose from 'mongoose'

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://vanthuan20069161:nvt12346@thuancluster.cdpasuc.mongodb.net/ZolaChatApp?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('Connect to Database successfully!!!')
    } catch (err) {
        console.log('Connect failure!!!')
    }
}

export default { connect }
