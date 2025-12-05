import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    const filtered = {
      workItemId: body.resource.workItemId, // ID da PBI
      title: body.resource.revision.fields['System.Title'], // Título da PBI
      iterationPath: body.resource.revision.fields['System.IterationPath'], // Caminho da Iteração e sprint
      changedBy: body.resource.revision.fields['System.ChangedBy'], // Quem fez a alteração
      url: body.resource._links.html.href, // URL da PBI
      BoardColumn: body.resource.revision.fields['System.BoardColumn'], // Coluna do quadro atual
      oldValue: body.resource.revision.fields['System.State.oldValue'], // Valor anterior do estado
    };

    console.log('Dados filtrados:', filtered);

    await this.webhookService.save(filtered);
    return { status: 'OK' };
  }

  // Endpoint opcional para visualizar logs
  @Get()
  async getAll() {
    return this.webhookService.findAll();
  }
}
