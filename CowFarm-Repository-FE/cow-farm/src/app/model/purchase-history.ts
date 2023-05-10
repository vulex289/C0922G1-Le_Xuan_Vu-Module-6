import {Account} from './account';

export interface PurchaseHistory {
  purchaseHistoryId: number;
  billCode: string;
  dateOrder: string;
  total: number;
  account: Account;
}
