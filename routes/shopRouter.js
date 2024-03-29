/* const express = require('express');
const router = express.Router();
const auth = require('../middleware/authContact');
const { check, validationResult } = require('express-validator');

const Shop = require('../models/Contact');

// @route     GET api/Shops
// @desc      Get all users Shops
// @access    Private
router.get('/',async (req, res) => {
  try {
    const shops = await Shop.find().sort({
      date: -1
    });
    res.json(shops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); */

// @route     POST api/Shops
// @desc      Add new Shop
// @access    Private
/* router.post(
  '/',
      [
        auth,
        [
          check('name', 'Name is required')
          .not()
          .isEmpty(),
        ]     
      ],
        
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, summary, imageCover, type } = req.body;

    try {
      const newShop = new Shop({
        name,
        email,
        phone,
        summary,
        imageCover,
        type,
        user: req.user.id
      });

      const shop = await newShop.save();

      res.json(shop);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
 */
// @route     PUT api/Shops/:id
// @desc      Update contact
// @access    Private
/* router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, summary, imageCover, type } = req.body;

  // Build contact object
  const shopFields = {};
  if (name) shopFields.name = name;
  if (email) shopFields.email = email;
  if (phone) shopFields.phone = phone;
  if (summary) shopFields.summary = summary;
  if (imageCover) shopFields.imageCover = imageCover;
  if (type) shopFields.type = type;

  try {
    let shop = await Shop.findById(req.params.id);

    if (!shop) return res.status(404).json({ msg: 'shop not found' });

    // Make sure user owns shop
    if (shop.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { $set: shopFields },
      { new: true }
    );

    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 */
// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
/* router.delete('/:id',  async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) return res.status(404).json({ msg: 'shop not found' });

    // Make sure user owns shop
    if (shop.id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Shop.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Shop removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); */

//module.exports = router;


const express = require('express');
const {
  getAllShops,
  getShop,
  createShop,
  updateShop,
  deleteShop,
  shopPhotoUpload,
  uploadShopImage
} = require('./../controllers/shopController');

const Shop = require('../models/Contact');

const router = express.Router({ mergeParams: true });

//const advancedResults = require('../middleware/advancedResults');
//const { protect, authorize } = require('../middleware/auth');

//router.use(protect);
//router.use(authorize('admin'));

router
  .route('/')
  .get(getAllShops)  //advancedResults(Shop),
  .post(createShop);
  
router
  .route('/:id')
  .get(getShop)
  .put(updateShop)
  .delete(deleteShop);

router
.route('/:id/image')
.patch(shopPhotoUpload)  //shopPhotoUpload

module.exports = router; 