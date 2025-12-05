import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { log } from 'console';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async receive(@Body() body: any) {
    const filtered = {
      workItemId: body.resource.workItemId,
      title: body.resource.revision.fields['System.Title'],
      state: body.resource.revision.fields['System.State'],
      assignedTo: body.resource.revision.fields['System.AssignedTo'],
      iterationPath: body.resource.revision.fields['System.IterationPath'],
      revisedDate: body.resource.revisedDate,
      revisionNumber: body.resource.rev,
      changedBy: body.resource.revision.fields['System.ChangedBy'],
      url: body.resource._links.html.href,
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
