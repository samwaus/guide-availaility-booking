import Ajv, { ErrorObject } from 'ajv';
import { AvailabilitySaveObj } from '../types/customTypes';
const ajv = new Ajv();

/**
 * Validates booking data for the guide
 *
 * @param data AvailabilitySaveObj
 * @returns boolean
 */
const isBookingInputDataValid = (data: AvailabilitySaveObj): boolean => {
  const validationSchema = {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      weekNumber: { type: 'number' },
      availability: {
        type: 'object',
        items: {
          type: 'object',
          properties: {
            from: {
              type: 'number',
            },
            to: { type: 'number' },
          },
          required: ['from', 'to'],
        },
      },
    },
    required: ['userId', 'weekNumber', 'availability'],
    additionalProperties: true,
  };
  const validate = ajv.compile(validationSchema);
  const valid = validate(data);
  return valid;
};

/**
 * Validates delete data for the guide
 *
 * @param data Partial<AvailabilitySaveObj>
 * @returns boolean
 */
const isDeleteInputDataValid = (
  data: Partial<AvailabilitySaveObj>
): boolean => {
  const validationSchema = {
    type: 'object',
    properties: {
      userId: { type: 'number' },
      weekNumber: { type: 'number' },
      availabilityId: { type: 'string' },
    },
    required: ['userId', 'weekNumber', 'availabilityId'],
    additionalProperties: false,
  };
  const validate = ajv.compile(validationSchema);
  const valid = validate(data);
  return valid;
};

export { isBookingInputDataValid, isDeleteInputDataValid };
