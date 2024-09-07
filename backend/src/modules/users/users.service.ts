import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from '@/utils/helper';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly mailerService: MailerService) { }

  isEmailExits = async (email: string) => {
    const user = await this.userModel.exists({ email })
    if (user) return true
    return false
  }


  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address } = createUserDto

    //check email
    const isExist = await this.isEmailExits(email)
    if (isExist) {
      throw new BadRequestException(`Email da ton tai :${email} `)
    }
    //hash password
    const hashPassword = await hashPasswordHelper(password)
    const user = await this.userModel.create({
      name, email, password: hashPassword, phone, address
    })
    return {
      _id: user._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, limit, sort } = aqp(query)
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    const totalItems = (await this.userModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * (pageSize)

    const results = await this.userModel.find(filter).limit(limit).skip(skip).sort(sort as any).select("-password");
    return { results, totalItems, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(UpdateUserDto: UpdateUserDto) {
    const { name, phone, address, image } = UpdateUserDto;
    const result = await this.userModel.updateOne(
      { _id: UpdateUserDto._id },
      { name, phone, address, image }
    );
    return result;
  }


  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return this.userModel.deleteOne({ _id })
    } else {
      throw new BadRequestException("id khong dung dinh dang")
    }

  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }


  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto

    //check email
    const isExist = await this.isEmailExits(email)
    if (isExist) {
      throw new BadRequestException(`Email da ton tai :${email} `)
    }
    //hash password
    const hashPassword = await hashPasswordHelper(password)
    const codeId = uuidv4()
    const user = await this.userModel.create({
      name, email, password: hashPassword, isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(30, 'seconds')
    })

    //send email

    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Active account ', // Subject line
      text: 'welcome', // plaintext body
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId

      }

    }

    )

    return {
      _id: user._id
    }

  }




}
