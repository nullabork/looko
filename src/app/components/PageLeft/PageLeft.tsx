import * as React from 'react';
import {
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { AccessKey, Types } from '@Models/index';
import { Workspaces, WorkspaceRow } from '@Components/index';

interface IPageLeftProps {

}


let sortWorkspaceOrder = (aAK: AccessKey, bAK: AccessKey) => bAK.getCreateDate().getTime() - aAK.getCreateDate().getTime();


export class PageLeft extends React.Component<IPageLeftProps, {}> {

   constructor(props?: IPageLeftProps) {
      super(props);
   }

   selectWorkspace(context: AccountContextInterface, selectedAccessKey: AccessKey) {
      context.set((state) => {
         state.selectedWorkspace = selectedAccessKey;
         state.detailsView = Types.WORKSPACE;
      });

      if (!selectedAccessKey.ResultSet.results.length) {
         selectedAccessKey.ResultSet.fetch(() => {
            context.set((state) => {
               state.selectedWorkspace = selectedAccessKey;
               state.detailsView = Types.WORKSPACE; 
            })
         });
      }
   }

   render() {
      return (
         <AccountContextConsumer>
            {s => s && (
               <Workspaces>
                  {
                     s.account.AccessKeys.sort(sortWorkspaceOrder).map((ak: AccessKey) => {
                        return <WorkspaceRow
                           key={ak.Id}
                           AccessKey={ak}
                           onSelect={(ak: AccessKey) => this.selectWorkspace(s, ak)}
                           isActive={(s.selectedWorkspace && s.selectedWorkspace.Name == ak.Name)} />
                     })
                  }
               </Workspaces>
            )}
         </AccountContextConsumer>

      )
   }
}

