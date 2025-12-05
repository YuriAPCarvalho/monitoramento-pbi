import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<any>,
  ) {}

  async save(payload: any) {
    const revision = payload.resource?.revision;

    if (!revision) return;

    const doc = new this.webhookModel({
      workItemId: revision.id,
      rev: revision.rev,
      title: revision.fields['System.Title'],
      state: revision.fields['System.State'],
      iterationPath: revision.fields['System.IterationPath'],
      assignedTo: revision.fields['System.AssignedTo'],
      changedBy: revision.fields['System.ChangedBy'],
      changedDate: revision.fields['System.ChangedDate'],
      createdDate: revision.fields['System.CreatedDate'],
      createdBy: revision.fields['System.CreatedBy'],
      tags: revision.fields['System.Tags'],
      parentId: revision.fields['System.Parent'],
      raw: payload,
    });

    return doc.save();
  }

  async findAll() {
    return this.webhookModel.find().sort({ criadoEm: -1 }).exec();
  }
}
