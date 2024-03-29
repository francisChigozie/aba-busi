const crypto = require('crypto');
const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter your first name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true
    },
    photo: {
      type:  String,
      default:'userImg.jpg'
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    role: {
        type: String,
        enum: ['customer','admin'],
        default: 'customer'
      },
    passwordChangedAt: Date,
     passwordResetToken: String,
     passwordResetExpires: Date,
    active: {
    type: Boolean,
    default: true,
    select: false
  },
  createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  // Virtual Populate
/* UserSchema.virtual('shops', {
  ref: 'Shop',
  foreignField:'name',
  localField: '_id'
}) */

 //Populateing Offers on Users
  /* UserSchema.pre(/^find/, function(next){ //{ path:'projects', select: '-_v -name'}
    this.populate({
      path:'shops',
      select:'name summary'
  }) 
    next()
})  */

 /* UserSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
}); */

 /* UserSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
}); */

/* UserSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
}); */

/* UserSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}; */

/*  UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
}; */

/* UserSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};  */

const User = mongoose.model('User', UserSchema);

module.exports = User;