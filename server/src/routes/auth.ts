import { Router } from 'express';

import { checkJwt } from '../middlewares/check-jwt';
import AuthController from '../controllers/auth.controller';

const router = Router();

// Login
router.post(
  '/login',
  AuthController.login
);

/*
// Change password
router.post(
  '/change-password', 
  [checkJwt], 
  AuthController.changePassword
);
*/

export default router;
