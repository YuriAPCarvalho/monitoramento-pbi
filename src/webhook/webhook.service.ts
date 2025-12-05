import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel('Webhook') private readonly webhookModel: Model<any>,
  ) {}

  async save(payload: any) {
    const doc = new this.webhookModel({ body: payload });
    return doc.save();
  }

  async findAll() {
    return this.webhookModel.find().sort({ timestamp: -1 }).exec();
  }
}
