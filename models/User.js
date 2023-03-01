const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // space를 없애주는 역할,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastmane: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    let user = this;

    if(user.isModified('password')) {
        // 비밀번호를 암호화시킴
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
    
});

userSchema.methods.comparePassword = function(plainPassword, cb) {

    // plainPassword와 암호화된 비밀번호가 같은지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    const user = this;

    // jsonwebtoken을 이용해서 토큰을 생성하기
    const token = jwt.sign(user._id.toHexString(), 'secterToken');

    user.token = token;
    user.save().then((user) => {
        if(!user) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User}