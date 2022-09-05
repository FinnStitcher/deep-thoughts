const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            validate: input => {
                const regex = new RegExp('^\\w+@\\w+.\\w+$');

                return regex.test(input);
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
    }
);

const User = model('User', UserSchema);

module.exports = User;