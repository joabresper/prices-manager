import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.prismaService.product.create({
        data: createProductDto,
      });
      return newProduct;
    } catch (error) {
      throw new BadRequestException('No se pudo crear el producto');
    }
  }

  async findAll() {
    const products = await this.prismaService.product.findMany();
    return products;
  }

  async findByName(name: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return products;
  }

  findOne(id: number) {
    const product = this.prismaService.product.findUnique({
      where: { id },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (!updateProductDto.name && !updateProductDto.description && !updateProductDto.price) {
      throw new BadRequestException('No fields to update');
    }
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar el producto');
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prismaService.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      throw new BadRequestException('No se pudo eliminar el producto');
    }
  }
}
