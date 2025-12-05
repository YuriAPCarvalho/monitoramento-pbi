import { Schema } from 'mongoose';

export const WebhookSchema = new Schema(
  {
    workItemId: Number,
    rev: Number,
    title: String,
    state: String,
    iterationPath: String,
    assignedTo: String,
    changedBy: String,
    changedDate: Date,
    createdDate: Date,
    createdBy: String,
    tags: String,
    parentId: Number,
    raw: Schema.Types.Mixed,
  },
  { timestamps: true },
);
