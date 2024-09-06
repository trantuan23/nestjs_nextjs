import {IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message:"Email khong duoc bo trong !"})
    email: string;
    @IsNotEmpty({message:"Password khong duoc bo trong !"})
    password: string;
    @IsOptional()
    name: string;
}
