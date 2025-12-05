import { Schema } from 'mongoose';

export const WebhookSchema = new Schema(
  {
    workItemId: Number,
    tipo: String,
    titulo: String,
    sprint: String,
    status: String,
    responsavel: String,
    criadoEm: Date,
    alteradoEm: Date,
    tags: String,
    url: String,
  },
  { timestamps: true },
);
