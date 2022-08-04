const mongoose = require('../connection')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User