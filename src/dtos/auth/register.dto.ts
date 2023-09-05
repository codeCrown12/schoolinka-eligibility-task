import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export default class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

}