import { StorageReference } from "firebase/storage";

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

type ContactInfo = {
  phoneNumber: string;
  name: string;
};

type Property = {
  primaryPhotoRef: string;
  address: Address;
  specifications: Specifications;
  expenses: Expenses;
  includedUtilitiesAndServices: string[];
  contactInfo: ContactInfo;
  description: string;
};

export { Address, Specifications, Expenses, ContactInfo, Property };
