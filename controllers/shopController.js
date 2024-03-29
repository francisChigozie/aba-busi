const path = require('path');
const User = require('./../models/User');
const catchAsync = require('./../utills/catchAsync')
const AppError = require('./../utills/appError')
const Shop = require('./../models/Contact')
const multer = require('multer')

//@ Describe Get AllShops
//@ Route GET/api/v1/shops
//@ Access Public
exports.getAllShops = catchAsync( async (req, res, next) => {
  const data = await Shop.find(); // { user: req.user.id }).sort({ date: -1 }

  /* res.render(
    'offerdetail',
    { 
     shops 
    }); */

    res.json(data)
    
  /* res.status(200).json({
    status:'success',
    results:shops.length,
    data: {
     shops 
    }}) */
   
})

//@ Describe Get A Single Shop
//@ Route GET/api/v1/shops/:id
//@ Access Public    
exports.getShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id)  //.populate('reviews')

  if(!shop){
    return next(new AppError(`No Shop found with this ID: ${req.params.id}`))
  }

  res.status(200).json({
    status:'success',
    data: {
     shop
    }})
})

//@ Describe Create An Shop
//@ Route POST/api/v1/shop
//@ Access Public
exports.createShop = catchAsync( async (req, res, next) => {
  const newShop = await Shop.create(req.body)

      res.status(201).json({
        status:'success',
        data: {
          shop: newShop
        }})
} )

//@ Describe Updte An Shop
//@ Route PTCH/api/v1/shop/:id
//@ Access  Admin 
exports.updateShop = catchAsync(async (req, res, next) => { 
  const shop = await Shop.findByIdAndUpdate(
    req.params.id, req.body, 
    {
    new: true,
    runValidators: true
    })

    if(!shop){
      return next(new AppError('No Shop found with that ID'))
    }

  res.status(200).json({
    status:'success',
    data: {
      shop
    }})
})
 
//@ Describe Delete An Shop
//@ Route DELETE/api/v1/shop/:id
//@ Access Admin 
exports.deleteShop = catchAsync(async (req, res, next) => {
  const shop = await Shop.findByIdAndDelete(req.params.id, req.body)

  if(!shop){
    return next(new AppError('No Shop found with that ID'))
  }
  
  res.status(200).json({
    status:'success',
    data: 'Shop deleted'
  })
})

// @desc      Upload photo for shop
// @route     PUT /api/v1/shops/:id/photo
// @access    Private
exports.shopPhotoUpload = catchAsync(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(
      new AppError(`Shop not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  /* if (shop.user.toString() !== req.user.id && req.user.role !== 'customer') {
    return next(
      new AppError(
        `User ${req.params.id} is not authorized to update this shop`,
        401
      )
    );
  } */

  if (!req.files) {
    return next(new AppError(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new AppError(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new AppError(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${shop._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new AppError(`Problem with file upload`, 500));
    }

    await Shop.findByIdAndUpdate(req.params.id, { imageCover: file.name });

   // Render a page with the uploaded image
   //res.render('home',{ imageCover: file.name }); //{layout: false}

        res.status(200).json({
        success: true,
        data: file.name
      })    
 

      })
});