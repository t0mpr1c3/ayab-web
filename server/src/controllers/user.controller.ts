import { Request, Response } from 'express';
import { validate } from 'class-validator';

import JwtHelper from '../helpers/jwt.helper';
import { dataSource } from '../models/data-source.model';
import {
  StatusMaybeWithToken, 
  error400, 
  error401, 
  error404, 
  error409,
} from '../../../shared/src/models/status.model';
import { defaultSettings } from '../../../shared/src/models/settings.model';
import UserEntity from '../entity/user.entity';
import SettingsEntity from '../entity/settings.entity';

class UserController {
/*
  static listAll = async (req: Request, res: Response) => {
    // Get users from database
    const userRepository = dataSource.getRepository(UserEntity);
    const users = await userRepository.find({
      select: ['id', 'username', 'email', 'role'] // Do not send password on response
    });

    // Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    // Get the ID from the URL
    const id = parseInt(req.params.id);

    // Get the user from DB
    const userRepository = dataSource.getRepository(UserEntity);
    try {
      const user = await userRepository.findOneOrFail({
        where: { id: id },
        select: ['id', 'username', 'email', 'role'], // Do not send password on response
      });
    } catch (error: any) {
      res.status(404).send(error404);
      return;
    }
  };
  */
 
/******************************************************************************/

  static newUser = async (req: Request, res: Response): Promise<StatusMaybeWithToken> => {
    // Get parameters from request body
    let { username, email, password, role } = req.body;
    let newUserEntity = new UserEntity();
    try {
      newUserEntity.username  = username;
      newUserEntity.email     = email;
      newUserEntity.password  = password;
      newUserEntity.role      = role;
      newUserEntity.settings  = defaultSettings as SettingsEntity;
      // Validate parameters
      const errors = await validate(newUserEntity);
      if (errors.length > 0) throw 400;
    }
    catch (error: any) {
      res.status(400).send(error400); // bad request
      return;
    }

    // Encrypt password to store securely on DB
    await newUserEntity.encryptPassword();

    try {
      // Insert default settings
      let insertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(SettingsEntity)
        .values(defaultSettings)
        .execute();
      newUserEntity.settingsId = insertResult.identifiers[0].id;

      // Insert new user
      insertResult = await dataSource
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values(newUserEntity)
        .execute();
      newUserEntity.id = insertResult.identifiers[0].id;
    } catch (error: any) {
      res.status(409).send(error409); // username or email already in use
      return;
    }

    // Success: send new authentication token
    res.status(201)
      .set('Cache-Control', 'no-store')
      .send({
        statusCode: 201, 
        statusMessage: 'New user created',
        ...JwtHelper.accessToken(newUserEntity.id, username),
      });
  };

/******************************************************************************/

  static updateUser = async (req: Request, res: Response): Promise<StatusMaybeWithToken> => {
    // Get ID from URL
    const id = parseInt(req.params.id);

    // Get parameters from request body
    const { username, email, settings, role } = req.body;

    // Verify ID against JWT
    if (id !== res.locals.jwtPayload.userId)
    {
      res.status(401).send(error401); // unauthorized
      return;
    }

    // Get user data from ID
    const userRepository = dataSource.getRepository(UserEntity);
    let oldUser: UserEntity;
    try {
      oldUser = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .getOne();
      if (!oldUser) throw 404;
    } catch (error: any) {
      res.status(404).send(error404); // not found
      return;
    }

    if (!!settings) {
      // Update settings separately because we don't want to create a new settings entry
      const settingsRepository = dataSource.getRepository(SettingsEntity);
      let newSettingsEntity: SettingsEntity;
      let updatedSettings: SettingsEntity;
      settings.id = oldUser.settingsId;
      try {
        // Validate new settings
        newSettingsEntity = settings as SettingsEntity;
        const errors = await validate(newSettingsEntity);
        if (errors.length > 0) throw 400;
      } catch {
        res.status(400).send(error400); // bad request
        return;
      }
      try {
        // Update settings entry
        updatedSettings = await settingsRepository.preload(settings);
        if (!updatedSettings) throw 404;
        await settingsRepository.save(updatedSettings);
      } catch (error: any) {
        res.status(404).send(error404); // not found
        return;
      }
    }

    if (!!username || !!email || !!role) {
      // Update user
      const partialUserEntity = {
        id:       id,
        username: username,
        email:    email,
        role:     role,
      } as Partial<UserEntity>;
      let updatedUser: UserEntity;
      try {
        // Validate user data
        updatedUser = await userRepository.preload(partialUserEntity);
        if (!updatedUser) throw 404;
      } catch (error: any) {
        res.status(404).send(error404); // not found
        return;
      }
      try {
        // Update user entry
        await userRepository.save(updatedUser);
      } catch (error: any) {
        res.status(409).send(error409); // duplicate username or email
        return;
      }
    }

    // Success: send new authentication token
    res.status(200)
      .set('Cache-Control', 'no-store')
      .send({
      statusCode: 200, 
      statusMessage: 'User information updated',
      ...JwtHelper.accessToken(id, username),
    });
  };

/******************************************************************************/

/*
  static deleteUser = async (req: Request, res: Response) => {
    // Get ID from URL
    const id = parseInt(req.params.id);

    const userRepository = dataSource.getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail({ where: { id: id } });
    } catch (error: any) {
      res.status(404).send(error404); // not found
      return;
    }
    userRepository.delete(id);

    // After all send a 204 (no content, but accepted) response
    res.status(204);
  };
  */
};

export default UserController;