import {IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message:"Email khong duoc bo trong !"})
    username: string;
    @IsNotEmpty({message:"Password khong duoc bo trong !"})
    password: string;
}
