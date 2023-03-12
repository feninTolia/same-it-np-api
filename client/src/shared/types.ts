export interface office {
  Number: string;
  ShortAddress: string;
  TotalMaxWeightAllowed: string;
  Schedule: object;
  Ref: string;
}

export interface IInitialValuesStatusDocument {
  status: string;
  dateCreated: string;
  recipientDateTime: string;
}
