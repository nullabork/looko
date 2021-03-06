import * as React from 'react';
import { 
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { Config } from '@Config/config'
import { AccessKey,Types, FetchoAPI, QueryActions } from '@Models/index';
import { Icon, NumberInput, DropdownInput,TextInput } from '@Components/index';

import './sass/_workspace_toolbar.scss';
import { TextareaInput } from '@Components/TextareaInput';

interface IWorkspaceToolbarProps {
   selectedAccessKey : AccessKey
}

export class WorkspaceToolbar extends React.Component<IWorkspaceToolbarProps, {}> {

   state: {
      menu : boolean;
      search : boolean;
      action : string;
      tag : string;
      query : string;
   }

   constructor(props?: IWorkspaceToolbarProps){
      super(props);
      this.state = {
         menu : false,
         search : false,
         tag : "",
         action : QueryActions.None,
         query : props.selectedAccessKey.ResultSet.pager.query
      }
   }


   workspace_toolbarMenu(): void {
      this.setState({
         menu : !this.state.menu
      });
   }

   workspace_toolbarSearch(): void {
      this.setState({
         search : !this.state.search
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

   updateFilter(context: AccountContextInterface): void {
      let selectedAccessKey = context.selectedAccessKey;

      selectedAccessKey.ResultSet.setQuery(this.state.query);
      selectedAccessKey.ResultSet.pager.offset = 0;

      selectedAccessKey.ResultSet.fetch(() => {
         context.set((state) => {
            return state;
         });
      });
   }

   clearFilter(context: AccountContextInterface): void {

      this.setState({
         query : ""
      }, () => {
         let selectedAccessKey = context.selectedAccessKey;

         selectedAccessKey.ResultSet.setQuery(this.state.query);
         selectedAccessKey.ResultSet.pager.offset = 0;

         selectedAccessKey.ResultSet.fetch(() => {
            context.set((state) => {
               return state;
            });
         });

      });
   }


   filterChange(value : string): void {
      this.setState({
         query : value
      });
   }

   deleteHack(context: AccountContextInterface) {
      FetchoAPI.queryTransform({
         AccessKeyID : context.selectedAccessKey.Id,
         Action : this.state.action,
         QueryText : this.state.query,
         Tag : this.state.tag,
         cb : () => {
            console.log('done transform');
         }
      });
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
                        <Icon name='search' className='lk-toolbar-item' onClick={ () => this.workspace_toolbarSearch() }/>
                        <Icon name='menu' className='lk-toolbar-item' onClick={ () => this.workspace_toolbarMenu() }/>
                        <Icon name='refresh-cw' className='lk-toolbar-item' onClick={ () => this.updateWorkspace(s) }/>

                        <div className='lk-toolbar-item lk-toolbar-item--fill'>
                           {s.selectedAccessKey.Workspace.Name}
                        </div>
                        
                        <Icon name='settings' className='lk-toolbar-item' onClick={ () => this.selectWorkspaceDtails(s) }/>
                     </div>

                     <div className={['lk-workspace_toolbar-menu', this.state.menu? 'lk-workspace_toolbar-menu--active' : null].join(' ')} ></div>
                     <div className={['lk-workspace_toolbar-search', this.state.search? 'lk-workspace_toolbar-search--active' : null].join(' ')} >

                        <div className='lk-workspace_toolbar--search-bar'>
                           <Icon name='zap' className='lk-toolbar-item' onClick={() => { this.updateFilter(s) }}/>
                           <Icon name='trash-2' className='lk-toolbar-item' onClick={() => { this.clearFilter(s) }}/>
                        </div>
                           
                        <TextareaInput
                           name="FilterText"
                           id={"filter-text"}
                           classNames={['lk-result-query']}
                           value={this.state.query}
                           onChange={(target: HTMLInputElement) => {
                              this.filterChange(target.value);
                           }} />

                        <div className='lk-workspace_toolbar--search-bar'>
                           <div className='lk-toolbar-item lk-toolbar-item--fill'></div>
                           <div className='lk-toolbar-item lk-toolbar-item--field'>

                           </div>

                           {
                              this.state.action == QueryActions.TagByQueryText 
                              || this.state.action == QueryActions.UntagByQueryText ?

                              <TextInput
                                 name="Tag"
                                 id={"tag"}
                                 value={ this.state.tag }
                                 onChange={(target: HTMLInputElement) => {
                                    
                                    this.setState({
                                       tag : target.value
                                    })

                                 }} /> : null
                           }

                           <DropdownInput 
                              id='action'
                              name='Action'
                              value={this.state.action}
                              onChange={ (e:HTMLInputElement) => {
         
                                 this.setState({
                                    action : e.value
                                 })
                              }}
                              items={
                                 Object.keys(QueryActions).map( (key:any) => {
                                    return {
                                       label : QueryActions[key],
                                       value : key,
                                       selected :  this.state.action == key
                                    }
                                 })
                              } />
                           <Icon name='star' className='lk-toolbar-item' onClick={() => { this.deleteHack(s) }}/>

                        </div>

                     </div>
                  </div>
               )}
            </AccountContextConsumer>
      
      )
   }

}

