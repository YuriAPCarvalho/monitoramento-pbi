import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<any>,
  ) {}

  async save(payload: any) {
    const fields = payload?.resource?.revision?.fields || {};
    const workItemId = payload?.resource?.workItemId;
    const url = payload?.resource?._links?.html?.href;

    if (!workItemId) return null;

    const doc = {
      workItemId,
      tipo: fields['System.WorkItemType'] || null,
      titulo: fields['System.Title'] || null,
      sprint: fields['System.IterationPath'] || null,
      status: fields['System.State'] || null,
      responsavel: fields['System.AssignedTo'] || null,
      criadoEm: fields['System.CreatedDate']
        ? new Date(fields['System.CreatedDate'])
        : null,
      alteradoEm: fields['System.ChangedDate']
        ? new Date(fields['System.ChangedDate'])
        : null,
      tags: fields['System.Tags'] || null,
      url: url || null,
    };

    return new this.webhookModel(doc).save();
  }

  async findAll() {
    return this.webhookModel.find().sort({ criadoEm: -1 }).exec();
  }
}
