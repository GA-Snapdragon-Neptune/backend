const mongoose = require('../connection')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
    },
    {
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User