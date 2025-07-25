

import status from "http-status";
import { NextFunction, Request, Response } from "express";

const notFound = ( req: Request, res: Response, next:NextFunction) => {
    
  
    return res.status(status.NOT_FOUND).json({
      success: false,
      message: 'Api not found !!',
      error: ''
    });
  }

  export default notFound;