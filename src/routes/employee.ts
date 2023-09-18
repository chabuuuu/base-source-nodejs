const express = require('express');
const router = express.Router();
import { EmployeeController } from '../controllers/EmployeeController';
import { authenticateJWT } from '../services/jwt/jwtAuthenticate';
const employeeController = new EmployeeController();

router.post('/login', employeeController.login);
router.get('/', authenticateJWT, employeeController.readAllData);
router.post('/', employeeController.addData);
router.delete('/:id', employeeController.deleteData);
router.put('/:id', employeeController.updateData);
module.exports = router;
