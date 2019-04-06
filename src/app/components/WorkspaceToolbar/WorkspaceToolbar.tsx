import * as React from 'react';
import { 
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { Config } from '@Config/config'
import { AccessKey,Types } from '@Models/index';
import { Icon, NumberInput } from '@Components/index';
import './sass/_workspace_toolbar.scss';

interface IWorkspaceToolbarProps {
   selectedAccessKey : AccessKey
}

export class WorkspaceToolbar extends React.Component<IWorkspaceToolbarProps, {}> {

   state: {
      menu : boolean;
   }

   constructor(props?: IWorkspaceToolbarProps){
      super(props);
      this.state = {
         menu : false
      }
   }


   workspace_toolbarMenu(context: AccountContextInterface): void {
      this.setState({
         menu : !this.state.menu
      });
   }

   updateWorkspace(context: AccountContextInterface): void {
      this.props.selectedAccessKey.update((ak : AccessKey) => {

         context.set((state: AccountContextInterface) => {
            return {
               ...state,
               selectedAccessKey : this.props.selectedAccessKey
            }
         });

      })
   }

   selectWorkspaceDtails(context: AccountContextInterface): void {
      context.set((state: AccountContextInterface) => {
         return {
            ...state,
            detailsView :  Types.WORKSPACE
         }
      });
   }

   render() {      

      return (

            <AccountContextConsumer>
            
               {s => s && (
                  <div className='lk-workspace_toolbar'>
                   
                     <div className='lk-workspace_toolbar-bar'>
                        <Icon name='menu' className='lk-icon-circle lk-workspace_toolbar-item' onClick={ () => this.workspace_toolbarMenu(s) }/>
                        <Icon name='refresh-cw' className='lk-icon-circle lk-workspace_toolbar-item' onClick={ () => this.updateWorkspace(s) }/>

                        <div className='lk-workspace_toolbar-item lk-workspace_toolbar-item--fill'>

                           {s.selectedAccessKey.Workspace.Name}

                        </div>
                        
                        <Icon name='settings' className='lk-icon-circle lk-workspace_toolbar-item' onClick={ () => this.selectWorkspaceDtails(s) }/>
                     </div>

                     <div className={['lk-workspace_toolbar-menu', this.state.menu? 'lk-workspace_toolbar-menu--active' : null].join(' ')} >
                        
                     </div>

                  </div>
               )}
            </AccountContextConsumer>
      
      )
   }

}

