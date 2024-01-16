import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';

import config from '../config/config';

// JWT expires in 7 days
export const jwtExpiresIn = '24h';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT token from the header
  let token = <string>req.headers.authorization;

  // remove Bearer if using Bearer Authorization mechanism
  if (token.toLowerCase().startsWith('bearer')) {
    token = token.slice('bearer'.length).trim();
  }
  let jwtPayload: any;
  
  // Try to validate the token and get data
  try {
    jwtPayload = <any>verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error: any) {
    // If token is not valid, respond with 401
    res.status(401).send({ code: 401, text: 'invalid token' }); // Unauthorized
    return;
  }

  // Send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = sign({ userId, username }, config.jwtSecret, {
    expiresIn: jwtExpiresIn
  });
  res.setHeader('token', newToken);

  // Call the next middleware or controller
  next();
};