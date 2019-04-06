import * as React from 'react';
import {
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { AccessKey, Types, Permission } from '@Models/index';
import { Workspaces, WorkspaceRow, AccountToolbar } from '@Components/index';
import './sass/_page.scss';

interface IPageLeftProps {
   collapsed : boolean;
}

let sortWorkspaceOrder = (aAK: AccessKey, bAK: AccessKey) => {
   let p1 = Permission.canEdit(aAK.Permissions),
     p2 = Permission.canEdit(bAK.Permissions);
 
   if ( !p1 && p2) {
     return 1;
   } else if(p1 && !p2) {
     return -1;
   }
   
   return bAK.getCreateDate().getTime() - aAK.getCreateDate().getTime()
}

export class PageLeft extends React.Component<IPageLeftProps, {}> {

   constructor(props?: IPageLeftProps) {
      super(props);
   }

   selectWorkspace(context: AccountContextInterface, selectedAccessKey: AccessKey) {
      context.set((state) => {
         return {
            ...state,
            selectedAccessKey,
            detailsView : Types.WORKSPACE
         }
      });

      if (!selectedAccessKey.ResultSet.results.length) {

         selectedAccessKey.ResultSet.fetch(() => {
            context.set((state) => {
               if (selectedAccessKey.Id == state.selectedAccessKey.Id) {
                  return {
                     ...state,
                     selectedAccessKey,
                     detailsView : Types.WORKSPACE
                  }
               }
            });
         });
         
      }
   }
   
   render() {
      return (
         <div
            className={[
               "lk-pageleft",
               this.props.collapsed ? "lk-pageleft--collapsed" : ""
            ].join(' ')}>

            <AccountToolbar  />
            <AccountContextConsumer>
               {s => s && (
                  <Workspaces>
                     {
                        s.account.AccessKeys.sort(sortWorkspaceOrder).map((ak: AccessKey) => {
                           return <WorkspaceRow
                              key={ak.Id}
                              AccessKey={ak}
                              onSelect={(ak: AccessKey) => this.selectWorkspace(s, ak)}
                              isActive={(s.selectedAccessKey && s.selectedAccessKey.Name == ak.Name)} />
                        })
                     }
                  </Workspaces>
               )}
            </AccountContextConsumer>
         </div>
      )
   }
}

