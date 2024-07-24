import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client'; // Prisma-generated type for Order
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  async getById(id: string): Promise<Order> {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(orderData: CreateOrderDTO): Promise<Order> {
    return this.prismaService.order.create({ data: orderData });
  }

  async updateById(id: string, updateOrderData: UpdateOrderDTO): Promise<Order> {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    return this.prismaService.order.update({
      where: { id },
      data: updateOrderData,
    });
  }

  async deleteById(id: string): Promise<void> {
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    await this.prismaService.order.delete({ where: { id } });
  }
}