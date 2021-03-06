import * as React from 'react';
import { Account, AccessKey, IResult, Types} from '@Models/index';

export interface AccountContextInterface {

  leftMainCollapsed : boolean;
  account: Account;
  set: {(callback:{(state: AccountContextInterface): AccountContextInterface;}): void;};
  selectedAccessKey?: AccessKey;
  selectedResult? : IResult;
  detailsView : Types;

  defaultPager : {
    count : number;
    offset : number;
  };

}

const context = React.createContext<AccountContextInterface | null>(null);

export const AccountContextProvider = context.Provider;
export const AccountContextConsumer = context.Consumer;