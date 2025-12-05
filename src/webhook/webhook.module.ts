import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { Schema } from 'mongoose';

const WebhookSchema = new Schema({
  body: { type: Object },
});

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Webhook', schema: WebhookSchema }]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
