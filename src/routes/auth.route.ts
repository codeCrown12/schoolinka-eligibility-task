import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { Route } from "../interfaces/route.interface";

export default class AuthRoute implements Route {
    
    public path: string = "/auth"
    public router: Router = Router()
    public controller: AuthController = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        
    }

}