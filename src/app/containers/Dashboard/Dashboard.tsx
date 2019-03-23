import * as React from 'react';
import IDashboardProps from './IDashboardProps';
import { AccessKey, Account, FetchoAPI,IResult  } from '@Models/index';
import { 
   AccountContextProvider,
   AccountContextInterface
} from '@Context/AccountContext';


import { DashboardView } from './DashboardView';

export class Dashboard extends React.Component<IDashboardProps, {}> {

   public acc: Account;
   public state: AccountContextInterface;

   constructor(props?: IDashboardProps){
      super(props);
     

      this.state = {
         set: (callBack:{(state:AccountContextInterface): void;}) => {
            callBack(this.state);
            this.setState(this.state);
         },
         account : new Account(),
         active : null,
         activeResult : null
      };


      if(this.props.account) {
         this.state.account.Name = this.props.account;
      }

      this.state.account.loadAccount(() => {
         // let accessKeys = this.state.account.AccessKeys;
         // let active = null;
         // if( accessKeys && accessKeys.length ) {
         //    active = accessKeys[0];
         // }

         this.setState({
            account :  this.state.account
         })

         if(!this.props.account) {
            this.props.history.push(`/Dashboard/${this.state.account.Name}`)
         }

      });
   }
   

   handleSelectAccessKey(active: AccessKey) {
      this.setState({
         active
      });


      active.ResultSet.next(() => {
         this.setState({
            active
         });
      });
   }

   onResultSelect(row : IResult){
      this.setState({
         activeResult : row
      });
   }

   onNewAccessKey () {

      // this.state.account.loadAccount(() => {
      //    this.setState({
      //       account :  this.state.account
      //    })
      // });

      let ak = new AccessKey();
      ak.loadAccessKey(this.state.account, (ak) => {
         this.state.account.addAccessKey(ak);
         this.setState({
            account :  this.state.account
         })
      });
     
   }

   render() {
      
      return (
         <AccountContextProvider value={this.state}>
            <DashboardView 
               onNewAccessKey={ () => this.onNewAccessKey() }
               handleSelectAccessKey={ (ak : AccessKey) => { this.handleSelectAccessKey(ak)}}
               onResultSelect={(result: IResult) => { this.onResultSelect(result)}} />
         </AccountContextProvider>
      )
   }
}