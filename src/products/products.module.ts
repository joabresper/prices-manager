import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService
    // {
    // provide: APP_GUARD,
    // useClass: JwtAuthGuard,
    // },
  ],
})
export class ProductsModule {}
