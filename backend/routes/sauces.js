const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get( '', auth, saucesCtrl.getAllSauces); /* Fonctionnelle */
router.get( '/:id', auth, saucesCtrl.getOneSauce); /* Fonctionnelle */
router.post( '', auth, multer, saucesCtrl.addSauce); /* Fonctionnelle */
router.put( '/:id', auth, multer, saucesCtrl.updateSauce); /* Fonctionnelle */
router.delete( '/:id', auth, saucesCtrl.deleteSauce); /* Fonctionnelle */
router.post( '/:id/like', auth, saucesCtrl.likeManagement);


module.exports = router;