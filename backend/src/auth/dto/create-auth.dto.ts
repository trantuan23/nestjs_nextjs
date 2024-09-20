import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({message:"Email khong duoc bo trong !"})
    email: string;
    @IsNotEmpty({message:"Password khong duoc bo trong !"})
    password: string;
    @IsOptional()
    name: string;
}

export class CheckAuthDto {
    @IsNotEmpty({message:"Id khong duoc bo trong !"})
    _id: string;
    @IsNotEmpty({message:"code khong duoc bo trong !"})
    code: string;
}



export class ChangePasswordAuthDto {
    @IsNotEmpty({message:"Code khong duoc bo trong !"})
    code: string;
    @IsNotEmpty({message:"password khong duoc bo trong !"})
    password: string;
    @IsNotEmpty({message:"confirmPassword khong duoc bo trong !"})
    confirmPassword: string;
    @IsNotEmpty({message:"Email khong duoc bo trong !"})
    email: string;

}