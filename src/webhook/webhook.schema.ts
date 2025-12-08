import { Schema } from 'mongoose';

export const WebhookSchema = new Schema({
  body: { type: Object },
});

export const WebhookCurrentSchema = new Schema({
  workItemId: { type: Number, unique: true },
  title: String,
  iterationPath: String,
  displayName: String,
  changedBy: String,
  url: String,
  boardColumn: String,
  oldValue: String,
  tag: String,
  timestamp: Date,
});
