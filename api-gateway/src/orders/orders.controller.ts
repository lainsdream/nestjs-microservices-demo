import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

interface CreateOrderDto {
  product: string;
  quantity: number;
  userId: string;
}

@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    // Publish event to RabbitMQ — fire and forget
    this.client.emit('order_created', dto);
    return { message: 'Order accepted', data: dto };
  }
}
