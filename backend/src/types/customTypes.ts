export type Availability = {
  from: number;
  to: number;
};

// type definition for saving data object
export type AvailabilitySaveObj = {
  userId: number;
  weekNumber: number;
  availability: Availability;
  availabilityId?: string; // This is used to pass the modified availability ID
};

// type definition for retrieving data object
export type AvailabilityDataObj = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  weekNumber: number;
  availability: Availability[];
};

export enum ValidationType {
  VALIDATION = 'validation',
  SUCCESS = 'success',
  OTHER = 'other',
}

export type ErrorObject = {
  success: boolean;
  type: ValidationType;
  data: { reason: string };
};

export type Success = {
  success: boolean;
  type: ValidationType;
  data: Object | undefined | null | ErrorObject;
};
