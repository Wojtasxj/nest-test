import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './../db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  getAll(): Order[] {
    return this.orders;
  }

  getById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  create(orderData: CreateOrderDTO): Order {
    const newOrder: Order = { id: uuidv4(), ...orderData };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateById(id: string, updateOrderData: UpdateOrderDTO): void {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException('Order not found');
    }
    this.orders[orderIndex] = { ...this.orders[orderIndex], ...updateOrderData };
  }

  deleteById(id: string): void {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException('Order not found');
    }
    this.orders.splice(orderIndex, 1);
  }
}
