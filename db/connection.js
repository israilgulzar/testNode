const mongoose = require("mongoose")

module.exports = async () => {
    try {
        const db_url = 'mongodb+srv://tajperfumesdevelopers:BWKzMMdN8VZTVBDg@cluster0.hbhm9wq.mongodb.net/tajperfumes?retryWrites=true&w=majority'

        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`DB is successfully connected....`)
    } catch (error) {
        console.error("Error on DB Connection:")
        console.error(error)
    }
}
