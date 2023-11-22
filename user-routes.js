// user related routing eg-login,registeration.
import express from 'express';
import { userController } from '../controllers/user-controller.js';
export const userRoutes = express.Router();
// CRUD
userRoutes.get('/profile/:username', userController.profile); //Read
userRoutes.post('/login', userController.login); // for insertion
userRoutes.post('/register', userController.register);
//userRoutes.put('/change-password') //updation
//userRoutes.delete('/remove-account'); //Deletion