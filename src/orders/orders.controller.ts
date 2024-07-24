import { Controller, Get, Param, Delete, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  async getAll(): Promise<Order[]> {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order> {
    return this.ordersService.getById(id);
  }
  
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string): Promise<{ success: boolean }> {
    await this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  async create(@Body() orderData: CreateOrderDTO): Promise<Order> {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ): Promise<{ success: boolean }> {
    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
