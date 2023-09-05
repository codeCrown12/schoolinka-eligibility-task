import { IsString, IsOptional } from "class-validator";

export default class FilterDto {

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    limit?: string

    @IsString()
    @IsOptional()
    page?: string

}