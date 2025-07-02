import { model, models, Schema, Types } from "mongoose";

export interface IModel {}

const ModelSchema = new Schema<IModel>({});

const Model = models?.question || model<IModel>("Model", ModelSchema);
export default Model;
