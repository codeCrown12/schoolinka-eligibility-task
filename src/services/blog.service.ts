import database from "../database";
import { PrismaClient } from "@prisma/client";
import PostDto from "../dtos/blog/post.dto";
import HttpException from "../utils/exception";
import { StatusCodes } from "http-status-codes";
import FilterDto from "../dtos/blog/filter.dto";

export default class BlogService {

    private dbService: PrismaClient = database.getClient()

    public async getAllPosts(dto: FilterDto) {
        const limit = dto.limit ? parseInt(dto.limit) : 50
        const page = dto.page ? parseInt(dto.page) : 1
        const skip = (page - 1) * limit
        interface QueryFilter {
            take?: number,
            where?: any,
            skip?: number,
            orderBy?: any,
            include?: any
        }
        let query: QueryFilter = {
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        }
        if(dto.title) {
            query = {
                ...query,
                where: {
                    title: dto.title
                }
            }
        }
        const count = await this.dbService.post.count(query.where)
        const results = await this.dbService.post.findMany(query)
        return {
            results,
            total: count,
            total_pages: Math.ceil(count/limit),
            current_page: page,
            limit
        }
    }

    public async getSinglePost(id: number) {
        const post = await this.dbService.post.findFirst({
            where: {
                id: id
            }
        })
        return post
    }

    public async addPost(userId: number, dto: PostDto) {
        const post = await this.dbService.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                published: dto.published,
                authorId: userId
            }
        })
        return post
    }

    public async editPost(userId: number, id: number, dto: PostDto) {
        const post = await this.dbService.post.update({
            where: {
                id: id,
                authorId: userId
            },
            data: {
                title: dto.title,
                content: dto.content,
                published: dto.published
            }
        })
        return post
    }

    public async deletePost(userId: number, id: number) {
        const post = await this.dbService.post.delete({
            where: {
                id: id,
                authorId: userId
            }
        })
        return post
    }

}