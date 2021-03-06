const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userScheme = mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userScheme.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }

})

userScheme.methods.comparePassword = function(plainPassword, cb){
    var user = this;

    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

userScheme.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
}

userScheme.statics.findByToken = function(token, cb){
    var user = this;
    jwt.verify(token, 'secret', function(err, decode){
        user.findOne({ "_id" : decode, "token" : token }, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model('User', userScheme);
module.exports = { User }; 