import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { log } from 'console';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    const bodyString = JSON.stringify(body, null, 2); // transforma em string com identação
    const lines = bodyString.split('\n'); // quebra em linhas
    const preview = lines.slice(0, 100).join('\n'); // pega apenas as 100 primeiras linhas
    console.log('Webhook recebido (preview 100 linhas):\n', preview);
    await this.webhookService.save(body);
    return { status: 'OK' };
  }

  // Endpoint opcional para visualizar logs
  @Get()
  async getAll() {
    return this.webhookService.findAll();
  }
}
