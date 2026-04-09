import { Module } from '@nestjs/common';
import { NotificationsHandler } from './notifications.handler';

@Module({
  providers: [NotificationsHandler],
})
export class NotificationsModule {}
