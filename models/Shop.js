const mongoose = require('mongoose')
const slugify = require('slugify')

const ShopSchema = new mongoose.Schema([
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        name:{
            type: String,
            required:[true,'Enter name of the shop '],
            trim: true
        },
        slug: String,
        address:{
            type: String,
            required:[true,'Enter business address']
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
            required:[true,'Please enter your name ']
        },
        imageCover:{
            type: String,
            required:[false,'Shop must have a cover image']
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
            required:[false,' Admin work']
        },
        type: {
            type: String,
            default: 'business'
          },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
],{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

//* / Document Middlewre Run before save
ShopSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true})
    next()
})
 
// Virtual Populate
ShopSchema.virtual('reviews', {
    ref: 'Review',
    foreignField:'shop',
    localField: '_id'
})

const Shop = mongoose.model('Shop', ShopSchema)
module.exports = Shop;