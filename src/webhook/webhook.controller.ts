import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookCurrentService } from './webhook-current.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly webhookCurrentService: WebhookCurrentService,
  ) {}

  @Post()
  async receive(@Body() body: any) {
    const date = new Date();
    date.setHours(date.getHours() - 4);

    const filtered = {
      workItemId: body.resource.workItemId, // ID da PBI
      title: body.resource.revision.fields['System.Title'], // Título da PBI
      iterationPath: body.resource.revision.fields['System.IterationPath'], // Caminho da Iteração e sprint
      displayName: body.resource.revision.fields['System.AssignedTo'], // Nome do responsável
      changedBy: body.resource.revision.fields['System.ChangedBy'], // Quem fez a alteração
      url: body.resource._links.html.href, // URL da PBI
      boardColumn: body.resource.revision.fields['System.BoardColumn'], // Coluna atual
      oldValue: body.resource.fields['System.BoardColumn']?.oldValue, // Estado anterior
      tag: body.resource.revision.fields['System.Tags'], // Tags
      timestamp: date,
    };

    await this.webhookService.save(filtered);

    await this.webhookCurrentService.upsert(filtered);

    return { status: 'OK' };
  }

  @Get()
  async getAll() {
    return this.webhookService.findAll(); // histórico
  }
}
