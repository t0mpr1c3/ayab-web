import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../models/data-source.model';
import { UserEntity } from '../entity/user.entity';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get user ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get user data from DB
    const userRepository = dataSource.getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail({ where: { id: id }});
    } catch (error) {
      res.status(401).send();
      return;
    }

    // Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) {
      next();
    } else {
      res.status(401).send();
    }
  };
};
