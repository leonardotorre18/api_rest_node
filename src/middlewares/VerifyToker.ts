import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';

// Config dotenv to read environment variables
dotenv.config();

const secret = process.env.SECRET_KEY_TOKEN || '';

/**
 * 
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response } res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification or next execution
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    // Check HEADER from Request for 'x-access-token'
    const token: string | undefined = req.headers["authorization"];

    // Verify if jwt is present
    if(!token){
        return res.status(400).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consume this endpoint'
        });
    }

    // Verify the token obtained. We pass the secret
    jwt.verify(token, secret, (err: any, decoded: any) => {

        if(err){
            return res.status(403).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token in request'
            });
        }

        // Execute Next Function -> Protected Routes will be executed
        next();

    });


}
export default verifyToken