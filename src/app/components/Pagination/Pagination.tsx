import * as React from 'react';
import { 
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { Config } from '@Config/config'
import { AccessKey } from '@Models/AccessKey';
import { Icon, NumberInput } from '@Components/index';
import './sass/_pagination.scss';

interface IPaginationProps {
   selectedAccessKey : AccessKey
}

export class Pagination extends React.Component<IPaginationProps, {}> {

   state: {
      menu : boolean;
   }

   constructor(props?: IPaginationProps){
      super(props);
      this.state = {
         menu : false
      }
   }

   selectWorkspace(context:AccountContextInterface,selectedAccessKey: AccessKey){
      // if(!selectedAccessKey.ResultSet.results.length){
         
      // }
   }

   maxOut(context: AccountContextInterface): void {
      this.props.selectedAccessKey.ResultSet.max().fetch(() => {
         context.set((state) => {
            state.selectedWorkspace =  this.props.selectedAccessKey;
         })
      });
   }

   plusOne(context: AccountContextInterface): void {
      this.props.selectedAccessKey.ResultSet.next().fetch(() => {
         context.set((state) => {
            state.selectedWorkspace =  this.props.selectedAccessKey;
         })
      });
   } 

   minusOne(context: AccountContextInterface): void {
      this.props.selectedAccessKey.ResultSet.prev().fetch(() => {
         context.set((state) => {
            state.selectedWorkspace =  this.props.selectedAccessKey;
         })
      });
   }

   zeroOut(context: AccountContextInterface): void {

      

      this.props.selectedAccessKey.ResultSet.zero().fetch(() => {
         context.set((state) => {
            state.selectedWorkspace =  this.props.selectedAccessKey;
         })
      });
   }

   paginationMenu(context: AccountContextInterface): void {
      this.setState({
         menu : !this.state.menu
      });
   }

   changeCount(context: AccountContextInterface, value: number): void {
      this.props.selectedAccessKey.ResultSet.setPagerCount(value);
      this.props.selectedAccessKey.ResultSet.fetch(() => {
         context.set((state) => {
            state.selectedWorkspace =  this.props.selectedAccessKey;
         })
      });
   }


   render() {      
      let pager = this.props.selectedAccessKey.ResultSet.pager;
      let total = this.props.selectedAccessKey.Workspace.ResultCount;
      return (

            <AccountContextConsumer>
            
               {s => s && (
                  <div className='lk-pagination'>
                     <div className={['lk-pagination-menu', this.state.menu? 'lk-pagination-menu--active' : null].join(' ')} >


                        <NumberInput 
                           name="pager_count" 
                           label="Results per page"
                           id={s.selectedWorkspace.Id + "-Name"}
                           number={this.props.selectedAccessKey.ResultSet.defaultPager.count} 
                           onChange={(target : HTMLInputElement) => {
                              this.changeCount(s, +target.value);
                           }} />


                     </div>
                     <div className='lk-pagination-bar'>
                        <Icon name='chevrons-left' className='lk-icon-circle lk-pagination-item' onClick={ () => this.zeroOut(s) }/>
                        <Icon name='chevron-left' className='lk-icon-circle lk-pagination-item' onClick={ () => this.minusOne(s) }/>

                        <div className='lk-pagination-item lk-pagination-item--fill'>

                        {pager.offset} - { pager.offset + pager.count }/{total}

                        </div>
                        <Icon name='menu' className='lk-icon-circle lk-pagination-item' onClick={ () => this.paginationMenu(s) }/>
                        <Icon name='chevron-right' className='lk-icon-circle lk-pagination-item' onClick={ () => this.plusOne(s) }/>
                        <Icon name='chevrons-right' className='lk-icon-circle lk-pagination-item' onClick={ () => this.maxOut(s) }/>
                     </div>
                  </div>
               )}
            </AccountContextConsumer>
      
      )
   }

}

