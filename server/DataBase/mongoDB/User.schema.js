const mongoose = require('mongoose');
/** Password Encoding Module */
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    id: Number,
    useEmail: {
        type: String,
        unique: true,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

/** Password Encoding */
UserSchema.methods.generateHash = (password) => {
    bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

/** Password Decoding */
UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('users', UserSchema, 'users');