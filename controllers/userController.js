const path = require('path');
const User = require('./../models/User');
//const Contact = require('./../models/Contact');
//const Subscribe = require('./../models/Subscribe');
const multer = require('multer')
const catchAsync = require('../utills/catchAsync');
const AppError = require('../utills/appError');
const factory = require('./handlerFactory');

// @desc      Upload photo for customer
// @route     PUT /api/v1/customers/:id/photo
// @access    Private
exports.customerPhotoUpload = catchAsync(async (req, res, next) => { 

   const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`User not found with id of ${req.params.id}`, 404)
    );
  }
 
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
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new AppError(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.params.id, { photo: file.name });
  res.render('users',{ user });

  res.status(200).json({
    success: true,
    data: file.name
  });
});
});


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');


exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/upload/${req.file.filename}`);

  next();
});

 
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};


exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.render('users',{ updatedUser  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

//@ Describe Get A Single User
//@ Route GET/api/v1/users/:id
//@ Access Public    
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id) //{ path:'projects', select: '-_v -name'}

  if(!user){
    return next(new AppError('No User found with that ID'))
  }

  res.status(200).json({
    status:'success',
    data: {
      user
    }})
})

exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);

//@ Describe Update A User
//@ Route PTCH/api/v1/User/:id
//@ Access  Admin 
exports.updateUser = catchAsync(async (req, res, next) => { 
  const user = await User.findByIdAndUpdate(
    req.params.id, req.body, 
    {
    new:true,
    runValidators: true
    })

    if(!user){
      return next(new AppError('No User found with that ID'))
    }

    //res.render('users',{ user });
    res.status(200).json({
      status:'success',
      data: {
        user
      }})
})
 
exports.deleteUser = factory.deleteOne(User);

//@ Describe Create A Contact
//@ Route POST/api/v1/Contact
//@ Access Public
exports.createContact = catchAsync( async (req, res, next) => {
  const contact = await Contact.create(req.body)
  console.log(contact)

  res.render('contacts',{ contact });
} )

//@ Describe Create A Subcription
//@ Route POST/api/v1/Subscribe
//@ Access Public
exports.subscribe = catchAsync( async (req, res, next) => {
  const contact = await Subscribe.create(req.body)
  console.log(contact)

  res.render('contacts',{ contact });

} )


/* const catchAsync = require('./../utills/catchAsync')
const AppError = require('./../utills/appError')
const User = require('./../models/User')

//@ Describe Get All Users
//@ Route GET/api/v1/users
//@ Access Public
exports.getUsers = catchAsync( async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status:'success',
    results: users.length,
    data: {
      users 
    }})
})

//@ Describe Get A Single User
//@ Route GET/api/v1/users/:id
//@ Access Public    
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id) //{ path:'projects', select: '-_v -name'}

  if(!user){
    return next(new AppError('No User found with that ID'))
  }

  res.status(200).json({
    status:'success',
    data: {
      user
    }})
})

//@ Describe Update A User
//@ Route PTCH/api/v1/User/:id
//@ Access  Admin 
exports.updateUser = catchAsync(async (req, res, next) => { 
  const user = await User.findByIdAndUpdate(
    req.params.id, req.body, 
    {
    new: true,
    runValidators: true
    })

    if(!user){
      return next(new AppError('No User found with that ID'))
    }

  res.status(200).json({
    status:'success',
    data: {
      user
    }})
})
 
//@ Describe Delete A User
//@ Route DELETE/api/v1/User/:id
//@ Access Admin 
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id, req.body)

  if(!user){
    return next(new AppError('No User found with that ID'))
  }
  
  res.status(200).json({
    status:'success',
    data: 'User deleted'
  })
})
 */