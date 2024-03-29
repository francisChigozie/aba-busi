const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
},
name:{
    type: String,
    required:[true,'Enter name of the shop '],
    trim: true
},
address:{
    type: String,
    required:[false,'Enter business address']
},
summary:{
    type: String,
    required:[true,' ']
},
phone:{
    type: String,
    required:[true,' ']
},
email:{
    type: String,
    required:[true,' ']
},
website:{
    type: String,
    required:[false,'Please enter your name ']
},
imageCover:{
    type: String,
    default: 'userImg.jpg'
},
averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
images:{
    type: String,
    required:[false,'Shop may more image']
},
active:{
    type: Boolean,
    default: 'true'
},
type: {
    type: String,
    default: 'business'
  },
createdAt:{
    type:Date,
    default:Date.now
}
});

module.exports = mongoose.model('contact', ContactSchema);