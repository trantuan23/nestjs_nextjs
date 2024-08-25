import {IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"Ten khong duoc bo trong !"})
    name: string;
    @IsNotEmpty({message:"Email khong duoc bo trong !"})
    @IsEmail({},{message:'Invalid email message !'})
    email: string;
    @IsNotEmpty({message:"Password khong duoc bo trong !"})
    password: string;
    @IsNotEmpty({message:"Phone khong duoc bo trong !"})
    phone: string;
    address: string;
    image: string;
    codeId: string;
    codeExpired: Date;
}
