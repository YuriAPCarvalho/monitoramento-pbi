import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<any>,
  ) {}

  async save(payload: any) {
    const revisionFields = payload?.resource?.revision?.fields || {};
    const workItemId = payload?.resource?.workItemId;
    const url = payload?.resource?._links?.html?.href;

    if (!workItemId) return null;

    const filteredPayload = {
      workItemId,
      tipo: revisionFields['System.WorkItemType'] || null,
      titulo: revisionFields['System.Title'] || null,
      sprint: revisionFields['System.IterationPath'] || null,
      status: revisionFields['System.State'] || null,
      responsavel: revisionFields['System.AssignedTo'] || null,
      criadoEm: revisionFields['System.CreatedDate'] || null,
      alteradoEm: revisionFields['System.ChangedDate'] || null,
      tags: revisionFields['System.Tags'] || null,
      url: url || null,
    };

    const doc = new this.webhookModel(filteredPayload);
    return doc.save();
  }

  async findAll() {
    return this.webhookModel.find().sort({ criadoEm: -1 }).exec();
  }
}
