import { Module } from "@nestjs/common";
import { NotificationsHandler } from "./notifications.handler";

@Module({
  controllers: [NotificationsHandler],
})
export class NotificationsModule {}
