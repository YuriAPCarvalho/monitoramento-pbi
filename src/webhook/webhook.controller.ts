import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    const date = new Date();
    date.setHours(date.getHours() - 4);

    const filtered = {
      workItemId: body.resource.workItemId, // ID da PBI
      title: body.resource.revision.fields['System.Title'], // Título da PBI
      iterationPath: body.resource.revision.fields['System.IterationPath'], // Caminho da Iteração e sprint
      displayName: body.resource.revisedBy.displayName, // Nome do responsável pela PBI
      changedBy: body.resource.revision.fields['System.ChangedBy'], // Quem fez a alteração
      url: body.resource._links.html.href, // URL da PBI
      BoardColumn: body.resource.revision.fields['System.BoardColumn'], // Coluna do quadro atual
      oldValue: body.resource.fields['System.BoardColumn']?.oldValue, // Estado anterior
      tag: body.resource.revision.fields['System.Tags'], // Tags associadas
      timestamp: date,
    };

    await this.webhookService.save(filtered);
    return { status: 'OK' };
  }

  @Get()
  async getAll() {
    return this.webhookService.findAll();
  }
}
