import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { compare, hash} from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private prismaService: PrismaService
  ) {}

  async signUp(registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerAuthDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const { password } = registerAuthDto;
    const hashedPassword = await hash(password, 10);

    registerAuthDto = {
      ...registerAuthDto,
      password: hashedPassword,
    }

    const newUser = await this.usersService.create(registerAuthDto);
    return newUser;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginAuthDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    
    const isPasswordValid = await compare(
      loginAuthDto.password,
      user.password,
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    };

    const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
    const token = await this.jwtService.signAsync(payload)
    
    return {
      accessToken: token,
    };
  }
}
