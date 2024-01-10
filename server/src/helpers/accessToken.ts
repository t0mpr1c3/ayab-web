import { sign } from "jsonwebtoken";

import { jwtExpiresIn } from "../middlewares/checkJwt";
import config from "../config/config";

export function accessToken(userId: number, username: string) {
  // Sign JWT
  const token: string = sign(
    { userId: userId, username: username },
    config.jwtSecret,
    { expiresIn: jwtExpiresIn },
  );
  return {
    access_token: token,
    token_type: 'Bearer',
    expires_in: jwtExpiresIn,
  }
}