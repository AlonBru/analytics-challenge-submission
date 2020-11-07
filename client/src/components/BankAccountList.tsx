import React from 'react';

import List from '@material-ui/core/List';
import BankAccountItem from './BankAccountItem';
import { BankAccount } from '../models';
import EmptyList from './EmptyList';

export interface BankAccountListProps {
  bankAccounts: BankAccount[];
  deleteBankAccount: Function;
}

const BankAccountList: React.FC<BankAccountListProps> = ({ bankAccounts, deleteBankAccount }) => (
  <>
    {bankAccounts?.length > 0 ? (
      <List data-test="bankaccount-list">
        {bankAccounts.map((bankAccount: BankAccount) => (
          <BankAccountItem
            key={bankAccount.id}
            bankAccount={bankAccount}
            deleteBankAccount={deleteBankAccount}
          />
        ))}
      </List>
    ) : (
      <EmptyList entity="Bank Accounts" />
    )}
  </>
);

export default BankAccountList;
