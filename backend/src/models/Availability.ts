import { Schema, model, connect } from 'mongoose';
import { AvailabilitySaveObj } from '../types/customTypes';

// Create schema
const AvailabilitySchemaObj = new Schema({ from: Number, to: Number });
const schema = new Schema<AvailabilitySaveObj>(
  {
    userId: { type: Number, required: true },
    weekNumber: { type: Number, required: true },
    availability: { type: [AvailabilitySchemaObj], required: true },
  },
  { timestamps: true }
);

// Create model
const AvailabilitySchema = model<AvailabilitySaveObj>('Availability', schema);

export { AvailabilitySchema };
