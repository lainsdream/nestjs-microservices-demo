import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface OrderSavedPayload {
  orderId: string;
  userId: string;
  product: string;
}

@Controller()
export class NotificationsHandler {
  @EventPattern('order_saved')
  handleOrderSaved(@Payload() data: OrderSavedPayload) {
    // In real life: send email, push notification, etc.
    console.log(`[NOTIFICATION] Order ${data.orderId} confirmed for user ${data.userId}`);
    console.log(`[NOTIFICATION] Product: ${data.product} — email sent (simulated)`);
  }
}
