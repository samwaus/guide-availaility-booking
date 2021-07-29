import mongoose from 'mongoose';
import { AvailabilitySchema } from '../models/Availability';
import { isDurationAllowed, isInBetweenTimeFrame } from '../helpers/timeHelper';
import {
  isBookingInputDataValid,
  isDeleteInputDataValid,
} from '../helpers/validationHelper';
import {
  AvailabilitySaveObj,
  Success,
  ValidationType,
} from '../types/customTypes';

class AvailabilityService {
  private static connectDB() {
    mongoose.connect(
      // @ts-ignore
      process.env.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }

  /**
   * Service for creating a new availability record
   *
   * @param availabilityData AvailabilitySaveObj
   * @returns Success | Error
   */
  static async createAvailability(
    availabilityData: AvailabilitySaveObj
  ): Promise<Success | Error> {
    try {
      // Validate input data
      const valid = isBookingInputDataValid(availabilityData);
      let response: Success;
      if (valid) {
        // Check whether the submission is between 7am-10pm
        if (
          isInBetweenTimeFrame(
            availabilityData.availability.from,
            availabilityData.availability.to,
            [7, 22]
          )
        ) {
          // Check whether the duration is maximum of 2 hours
          if (
            isDurationAllowed(
              availabilityData.availability.from,
              availabilityData.availability.to,
              2
            )
          ) {
            // We can save this record
            AvailabilityService.connectDB();
            // Check whether a record already exists for the given week.
            const existingAvailability = await AvailabilitySchema.findOne({
              userId: availabilityData.userId,
              weekNumber: availabilityData.weekNumber,
            });
            let saveResponse;
            //let saveObj =
            if (existingAvailability) {
              // If so, update the record with  the new availability.
              const filter = {
                userId: availabilityData.userId,
                weekNumber: availabilityData.weekNumber,
              };

              const update = {
                availability: [
                  // @ts-ignore
                  ...existingAvailability.availability,
                  availabilityData.availability,
                ],
              };
              // @ts-ignore
              saveResponse = await AvailabilitySchema.updateOne(filter, update);
              console.log(saveResponse);
            } else {
              // Else create a new document
              saveResponse = await new AvailabilitySchema(
                availabilityData
              ).save();
            }

            response = {
              // @ts-ignore
              success: saveResponse?.id || saveResponse?.ok ? true : false,
              type: ValidationType.SUCCESS,
              data: saveResponse,
            };
          } else {
            response = {
              success: false,
              type: ValidationType.VALIDATION,
              data: {
                reason: 'The maximum allowed period is 2 hours per session.',
              },
            };
          }
        } else {
          response = {
            success: false,
            type: ValidationType.VALIDATION,
            data: { reason: 'The submission should be between 7AM and 10PM.' },
          };
        }
      } else {
        response = {
          success: false,
          type: ValidationType.VALIDATION,
          data: { reason: 'All details are required to make the booking.' },
        };
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Service for retrieving an availability for a given given guide
   *
   * @param userId number
   * @returns
   */
  static async getAvailability(userId: number): Promise<Success | Error> {
    try {
      if (userId) {
        AvailabilityService.connectDB();
        const response = await AvailabilitySchema.find({ userId: userId });
        return {
          success: true,
          type: ValidationType.SUCCESS,
          data: response,
        };
      } else {
        return {
          success: false,
          type: ValidationType.VALIDATION,
          data: { reason: 'User ID is required.' },
        };
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * Service for updating an availability record
   *
   * @param availabilityData AvailabilitySaveObj
   * @returns Success | Error
   */
  static async updateAvailability(
    availabilityData: AvailabilitySaveObj
  ): Promise<Success | Error> {
    try {
      // Validate input data
      const valid = isBookingInputDataValid(availabilityData);
      let response: Success;
      // The request should pass the existing availability ID
      if (valid && availabilityData?.availabilityId?.length) {
        // Check whether the submission is between 7am-10pm
        if (
          isInBetweenTimeFrame(
            availabilityData.availability.from,
            availabilityData.availability.to,
            [7, 22]
          )
        ) {
          // Check whether the duration is maximum of 2 hours
          if (
            isDurationAllowed(
              availabilityData.availability.from,
              availabilityData.availability.to,
              2
            )
          ) {
            // We can save this record
            AvailabilityService.connectDB();

            // Check whether a record already exists for the given week.
            const existingAvailability = await AvailabilitySchema.findOne({
              userId: availabilityData.userId,
              weekNumber: availabilityData.weekNumber,
            });

            let saveResponse;

            if (existingAvailability) {
              // If so, update the record with  the new availability.
              const filter = {
                userId: availabilityData.userId,
                weekNumber: availabilityData.weekNumber,
              };

              // Modify the availability
              const updatedAvailability =
                // @ts-ignore
                existingAvailability.availability.filter(
                  // @ts-ignore
                  (availability) =>
                    availability._id + '' !== availabilityData.availabilityId
                );
              const update = {
                availability: [
                  // @ts-ignore
                  ...updatedAvailability,
                  {
                    ...availabilityData.availability,
                    _id: availabilityData.availabilityId,
                  },
                ],
              };

              // @ts-ignore
              saveResponse = await AvailabilitySchema.updateOne(filter, update);
            }

            response = {
              // @ts-ignore
              success: saveResponse?.id || saveResponse?.ok ? true : false,
              type: ValidationType.SUCCESS,
              data: saveResponse,
            };
          } else {
            response = {
              success: false,
              type: ValidationType.VALIDATION,
              data: {
                reason: 'The maximum allowed period is 2 hours per session.',
              },
            };
          }
        } else {
          response = {
            success: false,
            type: ValidationType.VALIDATION,
            data: { reason: 'The submission should be between 7AM and 10PM.' },
          };
        }
      } else {
        response = {
          success: false,
          type: ValidationType.VALIDATION,
          data: { reason: 'All details are required to make the booking.' },
        };
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Service for deleting an availability for a given given guide
   *
   * @param userId number
   * @returns
   */
  static async deleteAvailability(
    deleteData: Partial<AvailabilitySaveObj>
  ): Promise<Success | Error> {
    try {
      if (isDeleteInputDataValid(deleteData)) {
        AvailabilityService.connectDB();

        // Find the record and delete the availability
        // Check whether a record already exists for the given week.
        const existingAvailability = await AvailabilitySchema.findOne({
          userId: deleteData.userId,
          weekNumber: deleteData.weekNumber,
        });

        let deleteResponse;
        let response: Success;

        if (existingAvailability) {
          // If so, update the record with  the new availability.
          const filter = {
            userId: deleteData.userId,
            weekNumber: deleteData.weekNumber,
          };

          // Modify the availability
          const updatedAvailability =
            // @ts-ignore
            existingAvailability.availability.filter(
              // @ts-ignore
              (availability) =>
                availability._id + '' !== deleteData.availabilityId
            );
          const update = {
            availability: updatedAvailability,
          };

          // @ts-ignore
          deleteResponse = await AvailabilitySchema.updateOne(filter, update);
          response = {
            // @ts-ignore
            success: deleteResponse?.id || deleteResponse?.ok ? true : false,
            type: ValidationType.SUCCESS,
            data: deleteResponse,
          };
        } else {
          response = {
            // @ts-ignore
            success: false,
            type: ValidationType.VALIDATION,
            data: { reason: "Record doesn't exist." },
          };
        }

        return response;
      } else {
        return {
          success: false,
          type: ValidationType.VALIDATION,
          data: { reason: 'All data was not sent.' },
        };
      }
    } catch (error) {
      return error;
    }
  }
}

export default AvailabilityService;
