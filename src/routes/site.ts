const express = require('express');
const router = express.Router();
import { SiteController } from '../controllers/SiteController';
const siteController = new SiteController();

router.get('/data/edit', siteController.edit);
router.get('/data/add', siteController.addData);
router.get('/media/add', siteController.addImage);
router.get('/', siteController.home);

module.exports = router;
