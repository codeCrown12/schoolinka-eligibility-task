import { NextFunction, Request, Response } from "express"
import AuthService from "../services/auth.service";
import { StatusCodes } from "http-status-codes"

export default class AuthController {

    private readonly service: AuthService;
    
    constructor () {
        this.service = new AuthService()
    }

    

}