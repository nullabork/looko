import * as React from 'react';
import { 
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { Config } from '@Config/config'
import { AccessKey,Types } from '@Models/index';
import { Icon, NumberInput } from '@Components/index';
import './sass/_account_toolbar.scss';

interface IAccountToolbarProps {}

export class AccountToolbar extends React.Component<IAccountToolbarProps, {}> {

   state: {
      menu : boolean;
   }

   constructor(props?: IAccountToolbarProps){
      super(props);
      this.state = {
         menu : false
      }
   }

   addWorkspace(context: AccountContextInterface): void {

      let ak = new AccessKey();
      ak.createAccessKey(context.account, (ak) => {
         context.account.addAccessKey(ak);

         context.set((state: AccountContextInterface) => {
            return state
         });
      });      
   }
   
   toggleMainLeft(context: AccountContextInterface): void {
      context.set((state: AccountContextInterface) => {
         state.leftMainCollapsed = !state.leftMainCollapsed;
         return state;
      });
   }

   render() {      

      return (

            <AccountContextConsumer>
            
               {s => s && (
                  <div className='lk-account_toolbar'>
                   
                     <div className='lk-account_toolbar-bar'>

                        <Icon name={ s.leftMainCollapsed? "arrow-right-circle" : "arrow-left-circle"} className='lk-icon-circle lk-account_toolbar-item' onClick={ () => this.toggleMainLeft(s) }/>
                        <Icon name='plus' className='lk-icon-circle lk-account_toolbar-item' onClick={ () => this.addWorkspace(s) }/>
                        <div className='lk-account_toolbar-item lk-account_toolbar-item--fill'></div>
                     </div>

                  </div>
               )}
            </AccountContextConsumer>
      
      )
   }

}

