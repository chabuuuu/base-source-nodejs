const express = require('express');
const router = express.Router();
import { OrmController } from '../controllers/OrmController';
const ormController = new OrmController();

router.post('/login', ormController.login);
router.get('/', ormController.readAllData);
router.post('/', ormController.addData);
router.delete('/:id', ormController.deleteData);
router.put('/:id', ormController.updateData);
module.exports = router;
