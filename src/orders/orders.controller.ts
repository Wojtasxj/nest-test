import { Controller, Get, Param, Delete, Post, Body, Put, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './../db'; // Zakładając, że istnieje plik db.ts, w którym zdefiniowana jest klasa Order
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  getAll(): Order[] {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Order {
    const order = this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id)) throw new NotFoundException('Order not found');
    this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO): Order {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id)) throw new NotFoundException('Order not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}