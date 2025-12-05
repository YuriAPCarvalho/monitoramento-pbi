import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { log } from 'console';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    console.log('Webhook recebido:', JSON.stringify(body, null, 2));
    await this.webhookService.save(body);
    return { status: 'OK' };
  }

  // Endpoint opcional para visualizar logs
  @Get()
  async getAll() {
    return this.webhookService.findAll();
  }
}
