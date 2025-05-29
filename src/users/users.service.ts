import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    })
    .then((user) => {
      if (user) {
        throw new Error('User already exists');
      }
    });

    if (!createUserDto.name || !createUserDto.email || !createUserDto.password) {
      throw new Error('Name, email, and password are required');
    }
    
    const newUser = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password, //TODO: Hashear la contrasenia
      },
    });
    return newUser;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    };

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.email && !updateUserDto.name && !updateUserDto.password) {
      throw new Error('No fields to update');
    }
    await this.findOne(id)

    const updatedUser = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.prismaService.user.delete({
      where: { id: id },
    });
  }

  async doAdmin(id: number) {
    const user = await this.findOne(id);
    if (user.isAdmin) {
      throw new Error('User is already an admin');
    }
    return await this.prismaService.user.update({
      where: { id: id },
      data: { isAdmin: true },
    });
  }
}
