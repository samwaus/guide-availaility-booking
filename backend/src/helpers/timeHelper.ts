import moment from 'moment';

/**
 * Checks whether a given time range is between the required time range
 *
 * @param startTimeStamp number
 * @param endTimeStamp number
 * @param range array
 * @returns boolean
 */
const isInBetweenTimeFrame = (
  startTimeStamp: number,
  endTimeStamp: number,
  range: [number, number]
): boolean => {
  return (
    moment(startTimeStamp).hour() <= range[1] &&
    moment(startTimeStamp).hour() >= range[0] &&
    moment(endTimeStamp).hour() <= range[1] &&
    moment(endTimeStamp).hour() >= range[0]
  );
};

/**
 * Checks whether the given duration is allowed
 * 
 * @param startTimeStamp number
 * @param endTimeStamp number
 * @param hours number
 * @returns boolean
 */
const isDurationAllowed = (
  startTimeStamp: number,
  endTimeStamp: number,
  hours: number
): boolean => {
  return (
    moment
      .duration(moment(endTimeStamp).diff(moment(startTimeStamp)))
      .asHours() <= hours
  );
};

export { isInBetweenTimeFrame, isDurationAllowed };
