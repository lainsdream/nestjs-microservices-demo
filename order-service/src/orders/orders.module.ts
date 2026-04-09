import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { Order } from "./order.entity";
import { OrdersHandler } from "./orders.handler";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: "NOTIFICATION_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
          ],
          queue: "notifications_queue",
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [OrdersHandler],
})
export class OrdersModule {}
