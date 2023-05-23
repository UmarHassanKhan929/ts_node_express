import { Document, Schema, model } from 'mongoose';

interface ITask extends Document {
  task: string;
  completed: boolean;
  //   completedTime?: Date;
  //   creationTime: Date;
}

const taskSchema = new Schema<ITask>(
  {
    task: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
    //   completedTime: {
    //     type: Date
    //   },
    //   creationTime: {
    //     type: Date,
    //     default: Date.now
    //   }
  },
  {
    timestamps: true
  }
);

export default model<ITask>('Task', taskSchema);
