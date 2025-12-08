import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WebhookCurrentService {
  constructor(
    @InjectModel('WebhookCurrent')
    private readonly webhookCurrentModel: Model<any>,
  ) {}

  async upsert(payload: any) {
    return this.webhookCurrentModel.findOneAndUpdate(
      { workItemId: payload.workItemId }, // filtro
      payload, // dados a serem atualizados
      { new: true, upsert: true }, // cria se não existir
    );
  }

  async findAll() {
    return this.webhookCurrentModel.find().exec();
  }
}
