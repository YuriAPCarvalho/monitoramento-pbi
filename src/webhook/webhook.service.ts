import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<any>,
  ) {}

  async save(payload: any) {
    const filteredPayload = {
      id: payload.resource?.id,
      tipo: payload.resource?.fields?.['System.WorkItemType'],
      titulo: payload.resource?.fields?.['System.Title'],
      sprint: payload.resource?.fields?.['System.IterationPath'],
      criadoEm: payload.resource?.fields?.['System.CreatedDate'],
      atualizadoEm: payload.resource?.fields?.['System.ChangedDate'],
      status: payload.resource?.fields?.['System.State'],
    };

    const doc = new this.webhookModel(filteredPayload);
    return doc.save();
  }

  async findAll() {
    return this.webhookModel.find().sort({ criadoEm: -1 }).exec();
  }
}
