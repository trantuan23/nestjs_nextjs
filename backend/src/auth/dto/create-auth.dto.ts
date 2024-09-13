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
