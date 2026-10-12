export interface Address {
  id: string;
  recipientName: string;
  streetAddress: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  token?: string;
  addresses: Address[];
}
