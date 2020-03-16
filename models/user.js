const { mongoose } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //Truong tham chieu
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

const User = mongoose.model('User', UserSchema);

const Register = async (name, email, password) => {
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) {
            throw 'Email da ton tai';
        } else {
            let encode = await bcrypt.hash(password, 10);
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = encode;
            await newUser.save();
        }
    } catch (error) {
        throw error;
    }
}

const Login = async (email, password) => {
    try {
        let foundUser = await User.findOne({ email }).exec();
        if (!foundUser) {
            throw 'Email chua dang ki';
        } else {
            let check = await bcrypt.compare(password, foundUser.password);
            if (check === true) {
                // Dang nhap thanh cong
                let object = {
                    id: foundUser.id
                };
                let tokenKey = await jwt.sign(object, secret, { expiresIn: 86400 });
                return tokenKey;
            } else {
                throw 'Password sai';
            }
        }

    } catch (error) {
        throw error;
    }
}

const Verify = async (tokenKey) => {
    try {
        let decoded = await jwt.verify(tokenKey, secret);
        if (Date.now() / 1000 > decoded.exp) {
            throw 'Token het han';
        }
        let foundUser = await User.findById(decoded.id);
        return foundUser;
    } catch (error) {
        throw error;
    }
}

module.exports = { User, Register, Login, Verify };