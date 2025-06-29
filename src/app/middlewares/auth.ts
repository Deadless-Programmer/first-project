import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken"
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import config from '../config';
import { TUserRole } from '../Modules/user/user.interface';
import { User } from '../Modules/user/user.model';

const auth = (...requiredRoles:TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

 const { role, userId, iat } = decoded;

const user = await User.isUserExistsByCustomId(userId);


 if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(status.FORBIDDEN, 'This user is blocked ! !');
    }






 if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }
     req.user=decoded as JwtPayload
       next();
});

     



  
}
export default auth;
