import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { WebhookCurrentService } from './webhook-current.service';
import { WebhookSchema, WebhookCurrentSchema } from './webhook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Webhook', schema: WebhookSchema },
      { name: 'WebhookCurrent', schema: WebhookCurrentSchema },
    ]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookCurrentService],
})
export class WebhookModule {}
