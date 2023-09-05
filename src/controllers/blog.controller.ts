import { NextFunction, Request, Response } from "express"
import BlogService from "../services/blog.service"
import { StatusCodes } from "http-status-codes"

export default class BlogController {

    private readonly service: BlogService = new BlogService()

    public getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        const res = await this.service.getAllPosts(request.query)
        response.status(StatusCodes.OK).send({ error: false, data: res })
    }

    public getSinglePost = async (request: Request, response: Response, next: NextFunction) => {
        const res = await this.service.getSinglePost(parseInt(request.params.id))
        response.status(StatusCodes.OK).send({ error: false, data: res })
    }

    public addPost = async (request: Request, response: Response, next: NextFunction) => {
        const res = await this.service.addPost(request.user?.id as number, request.body)
        response.status(StatusCodes.OK).send({ error: false, data: res })
    }

    public editPost = async (request: Request, response: Response, next: NextFunction) => {
        const res = await this.service.editPost(request.user?.id as number, parseInt(request.params.id), request.body)
        response.status(StatusCodes.OK).send({ error: false, data: res })
    }

    public deletePost = async (request: Request, response: Response, next: NextFunction) => {
        const res = await this.service.deletePost(request.user?.id as number, parseInt(request.params.id))
        response.status(StatusCodes.OK).send({ error: false, data: res })
    }

}