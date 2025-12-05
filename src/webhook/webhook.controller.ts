import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    await this.webhookService.save(body);
    return { status: 'OK' };
  }

  // Endpoint opcional para visualizar logs
  @Get()
  async getAll() {
    return this.webhookService.findAll();
  }
}
