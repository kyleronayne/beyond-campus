type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  aptUnitNum: string;
};

type Specifications = {
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

export { Address, Specifications, Expenses };
