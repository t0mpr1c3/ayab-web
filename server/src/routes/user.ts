import { Router } from 'express';

import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import UserController from '../controllers/UserController';

const router = Router();

/*
// Get all users
router.get(
  "/", 
  [checkJwt, checkRole(['ADMIN'])], 
  UserController.listAll
);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(['ADMIN'])],
  UserController.getOneById
);
*/

// Create a new user
router.post(
  "/register",
  UserController.newUser
);

// Edit one user
router.patch(
  '/update/:id([0-9]+)',
  [checkJwt],
  UserController.updateUser
);

/*
// Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);
*/

export default router;
