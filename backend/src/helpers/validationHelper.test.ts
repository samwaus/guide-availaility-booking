import {
  isBookingInputDataValid,
  isDeleteInputDataValid,
} from './validationHelper';
import {
  AvailabilitySaveObj,
  Success,
  ValidationType,
} from '../types/customTypes';

test('isBookingInputDataValid() Test', async () => {
  const invalidObj = {
    userId: 123456,
    availability: { from: 1627344887000, to: 1627348487000 },
  };

  const validObj = {
    userId: 123456,
    weekNumber: 1,
    availability: { from: 1627344887000, to: 1627348487000 },
  };
  //@ts-ignore
  expect(isBookingInputDataValid(invalidObj)).toBe(false);
  //@ts-ignore
  expect(isBookingInputDataValid(validObj)).toBe(true);
});

test('isDeleteInputDataValid() Test', async () => {
  const invalidObj = {
    userId: 123456,
    weekNumber: 1,
  };

  const validObj = {
    userId: 123456,
    weekNumber: 1,
    availabilityId: '60ffebae39854a8686257736',
  };
  //@ts-ignore
  expect(isDeleteInputDataValid(invalidObj)).toBe(false);
  //@ts-ignore
  expect(isDeleteInputDataValid(validObj)).toBe(true);
});
