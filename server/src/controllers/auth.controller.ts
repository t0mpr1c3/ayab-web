import { Request, Response } from 'express';

import { UserEntity } from '../entity/user.entity';
import { dataSource } from '../models/data-source.model';
import {
  StatusMaybeWithToken, 
  error400, 
  error401, 
  error404 
} from '../../../shared/src/models/status.model';
import { User } from '../../../shared/src/models/user.model';
import { accessToken } from '../helpers/access-token';

class AuthController {
  static login = async (req: Request, res: Response): Promise<StatusMaybeWithToken> => {
    // Get username and password from request body
    let { username, password } = req.body;
    if (typeof username !== 'string' ||
        typeof password !== 'string') {
      res.status(400).send(error400); // bad request
      return;
    }

    // Get user from database
    let user: UserEntity;
    try {
      user = await dataSource
        .getRepository(UserEntity)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.settings', 'settings')
        .where('user.username = :name', { name: username })
        .getOne();
      if (!user) throw 404;
    } catch (error: any) {
      res.status(404).send(error404); // not found
      return;
    }

    // Validate password
    let valid: boolean = await user
      .isUnencryptedPasswordValid(password);
    if (!valid) {
      res.status(401).send(error401); // unauthorized
      return;
    }

    // Send user data and authentication token in response
    res.status(200)
      .set('Cache-Control', 'no-store')
      .send({
        user: {
          id: user.id,
          username: username,
          email: user.email,
          settings: user.settings,
          role: user.role,
        } as User,
        ...accessToken(user.id, username)
      });
  };

////////////////////////////////////////////////////////////////////////////////
/*
  static changePassword = async (req: Request, res: Response) => {
    // Get user ID from JWT
    const userId = res.locals.jwtPayload.userId;

    // Get parameters from request body
    const { oldPassword, newPassword } = req.body;
    if (typeof oldPassword !== 'string' ||
        typeof newPassword !== 'string') {
          res.status(400).send(error400); // bad request
          return;
    }

    // Get user from database
    let user: UserEntity;
    try {
      user = await dataSource
        .getRepository(UserEntity)
        .findOneOrFail({
          where: { id: userId },
          select: ['username', 'password'],
        });
    } catch (error: any) {
      res.status(404).send(error404); // not found
      return;
    }

    // Validate password
    let valid: boolean = await user
      .isUnencryptedPasswordValid(oldPassword);
    if (!valid) {
      res.status(401).send(error401); // unauthorized
      return;
    }

    // Validate password length
    user.password = newPassword;
    const errors: ValidationError[] = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(error400); // bad request
      return;
    }

    // Encrypt new password
    await user.encryptPassword();

    // Update entry
    try {
      dataSource
        .getRepository(UserEntity)
        .createQueryBuilder()
        .update({ password: user.password })
        .where('id = :id', { id: userId })
        .execute();
    }
    catch (error: any) {
      res.status(404).send(error404); // not found
      return;
    }

    res.status(200)
      .set('Cache-Control', 'no-store')
      .send({
        statusCode: 200,
        statusMessage: 'Updated password',
        ...accessToken(userId, user.username)
      });
  };
  */
}
export default AuthController;