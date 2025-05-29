import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService
  ],
  exports: [UsersService],
})
export class UsersModule {}
