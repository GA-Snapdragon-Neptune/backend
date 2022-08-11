const mongoose = require('../connection')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        consumer: { type: Boolean, required: true },
        business: { type: Boolean, required: true },
    },
    {
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                delete ret.id;
                return ret;
            }
        }
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User