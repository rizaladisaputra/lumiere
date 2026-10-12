import { User } from '../types/user';

export const MOCK_USERS: User[] = [
  {
    id: 'user-cust-01',
    name: 'Elena Vance',
    email: 'elena.vance@example.com',
    role: 'CUSTOMER',
    token: 'mock-jwt-token-customer-12345',
    addresses: [
      {
        id: 'addr-01',
        recipientName: 'Elena Vance',
        streetAddress: 'Jl. Senopati No. 42, Kebayoran Baru',
        city: 'Jakarta Selatan',
        stateOrProvince: 'DKI Jakarta',
        postalCode: '12190',
        country: 'Indonesia',
        phone: '+62 812-9988-7766',
        isDefault: true,
      },
      {
        id: 'addr-02',
        recipientName: 'Elena Vance',
        streetAddress: '14 Rue Saint-Honoré',
        city: 'Paris',
        stateOrProvince: 'Île-de-France',
        postalCode: '75001',
        country: 'France',
        phone: '+33 1 42 68 00 00',
        isDefault: false,
      },
    ],
  },
  {
    id: 'user-admin-01',
    name: 'Alexander Sterling',
    email: 'admin@lumiere.com',
    role: 'ADMIN',
    token: 'mock-jwt-token-admin-99999',
    addresses: [],
  },
];
