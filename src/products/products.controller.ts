import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './../db';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
    public getById(@Param('id') id: string) {
  return this.productsService.getById(id);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
      this.productsService.deleteById(id);
      return { success: true };
    }

    @Post('/')
    create(@Body() productData: Omit<Product, 'id'>) {
      return this.productsService.create(productData);
  }
}