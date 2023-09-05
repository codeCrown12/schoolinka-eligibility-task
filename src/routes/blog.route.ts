import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import BlogController from "../controllers/blog.controller";
import dtoValidationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import PostDto from "../dtos/blog/post.dto";
import FilterDto from "../dtos/blog/filter.dto";

export default class BlogRoute implements Route {
    
    public path: string = "/post"
    public router: Router = Router()
    public controller: BlogController = new BlogController()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){

        this.router.get(
            "/get",
            dtoValidationMiddleware(FilterDto, "query"),
            this.controller.getAllPosts
        )

        this.router.get(
            "/get/:id",
            this.controller.getSinglePost
        )

        this.router.post(
            "/add",
            authMiddleware,
            dtoValidationMiddleware(PostDto, "body"),
            this.controller.addPost
        )

        this.router.put(
            "/edit/:id",
            authMiddleware,
            dtoValidationMiddleware(PostDto, "body"),
            this.controller.editPost
        )

        this.router.delete(
            "/delete/:id",
            authMiddleware,
            this.controller.deletePost
        )

    }

}