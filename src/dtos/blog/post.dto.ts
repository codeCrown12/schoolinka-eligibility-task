import { IsBoolean, IsOptional, IsString } from "class-validator"

export default class PostDto {

    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    content: string

    @IsBoolean()
    @IsOptional()
    published: boolean

}