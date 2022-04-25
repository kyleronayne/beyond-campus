type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  aptUnitNum: string;
};

type Specifications = {
  type: string;
  squareFootage: string;
  numFloors: string;
  numBedrooms: string;
  numBathrooms: string;
};

type Expenses = {
  rent: string;
  applicationFee: string;
  securityDeposit: string;
  cleaningFee: string;
};

type Property = {
  primaryPhotoUUID: string;
  address: Address;
  specifications: Specifications;
  expenses: Expenses;
  includedUtilitiesAndServices: string[];
  description: string;
};

export { Address, Specifications, Expenses, Property };
