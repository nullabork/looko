import * as React from 'react';
import { Account, AccessKey, IResult} from '@Models/index';

export interface AccountContextInterface {
  account: Account,
  set: {(callback:{(state: AccountContextInterface): void;}): void;},
  active?: AccessKey,
  activeResult : IResult
}

const context = React.createContext<AccountContextInterface | null>(null);

export const AccountContextProvider = context.Provider;
  
export const AccountContextConsumer = context.Consumer;