const express = require('express');
const router = express.Router();
import { EmployeeController } from '../controllers/EmployeeController';
const employeeController = new EmployeeController();

router.post('/login', employeeController.login);
router.get('/', employeeController.readAllData);
router.post('/', employeeController.addData);
router.delete('/:id', employeeController.deleteData);
router.put('/:id', employeeController.updateData);
module.exports = router;
