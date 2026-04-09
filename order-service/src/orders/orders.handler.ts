import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

interface CreateOrderPayload {
  product: string;
  quantity: number;
  userId: string;
}

@Controller()
export class OrdersHandler {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,

    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: CreateOrderPayload) {
    console.log('Order received:', data);

    // Save to database
    const order = this.ordersRepo.create({
      product: data.product,
      quantity: data.quantity,
      userId: data.userId,
      status: 'pending',
    });

    const saved = await this.ordersRepo.save(order);
    console.log('Order saved:', saved.id);

    // Emit event to notification service
    this.notificationClient.emit('order_saved', {
      orderId: saved.id,
      userId: saved.userId,
      product: saved.product,
    });
  }
}
