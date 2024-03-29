const path = require('path');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const multer = require('multer')
const auth = require('../middleware/authContact');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Shop = require('../models/Contact');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //@ Describe Delete An Shop
//@ Route DELETE/api/v1/shop/:id
//@ Access Admin 
 router.delete('/:id', async (req, res) => {

  try {
    await Shop.findByIdAndDelete(req.params.id, req.body)
    res.status(200).json({
      status:'success',
      data: 'Shop deleted !'
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@ Describe Upload An Image For Shop
//@ Route POST/api/shop/:id
//@ Access Admin 

const multerStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    return cb(null, '../public/images') // path.resolve(__dirname, 
  },
  filename: (req,file,cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const upload = multer({ storage: multerStorage });

router.post('/upload',upload.single('file'),(req,res) => {
  console.log(req.body)
  console.log(req.file)
})

module.exports = router;
