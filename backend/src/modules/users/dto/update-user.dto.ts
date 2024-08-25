import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateUserDto{
    @IsMongoId({message:"id khong hop le"})
    @IsNotEmpty({message:"id khong duoc bo trong"})
    _id:string
    @IsOptional()
    name:string
    @IsOptional()
    phone:string
    @IsOptional()
    address:string
    @IsOptional()
    image:string
}
