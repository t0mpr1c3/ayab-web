import { sign } from "jsonwebtoken";

import { jwtExpiresIn } from "../middlewares/check-jwt";
import config from "../config/config";
import { AccessToken } from "../../../shared/src/models/access-token.model";

export default class JwtHelper {
  static accessToken(userId: number, username: string): AccessToken {
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
}