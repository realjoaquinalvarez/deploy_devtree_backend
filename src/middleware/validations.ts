import type { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

export const handleInputErrors = ( req : Request, res : Response, next: NextFunction) => {

    console.log('desde validation.ts');
    // manejar errores
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()});
        return;
    }
    next();
};
