import * as React from 'react';
import IDashboardProps from './IDashboardProps';
import { AccessKey, Account, FetchoAPI,IResult, Types  } from '@Models/index';
import { Config } from '@Config/config'
import { 
   AccountContextProvider,
   AccountContextInterface
} from '@Context/AccountContext';


import { DashboardView } from './DashboardView';

export class Dashboard extends React.Component<IDashboardProps, {}> {

   public acc: Account;
   public state: AccountContextInterface;
   public saveQuery : any;
   public wsPatchData : any;

   constructor(props?: IDashboardProps){
      super(props);
     
      this.wsPatchData={

      };

      this.state = {
         set: (callBack:{(state:AccountContextInterface): void;}) => {
            callBack(this.state);
            this.setState(this.state);
         },
         account : new Account(),
         selectedWorkspace : null,
         selectedResult : null,
         detailsView : Types.NULL,
         defaultPager : {
            offset : Config.pager.offset,
            count : Config.pager.count
         }
      };


      if(this.props.account) {
         this.state.account.Name = this.props.account;
      }

      this.state.account.loadAccount(() => {
         this.setState({
            account :  this.state.account
         })

         if(!this.props.account) {
            this.props.history.push(`/Dashboard/${this.state.account.Name}`)
         }
      });
   }

   handleWSPropertyChange(name:string,value:any){
      if(this.state.selectedWorkspace){
         this.state.selectedWorkspace.Workspace[name] = value;
         this.wsPatchData[name] = value;
         this.setState(this.state);

         clearTimeout(this.saveQuery);
         this.saveQuery = setTimeout(() => {

            this.state.selectedWorkspace.PatchWorkspace(this.wsPatchData,() => {
               console.log('updated');
            });

            this.wsPatchData = {};
         }, 1000);
         
      }
   }

   onResultSelect(row : IResult){
      this.setState({
         selectedResult : row,
         detailsView : Types.RESULT
      });
   }

   onNewAccessKey () {
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
               onResultSelect={(result: IResult) => { this.onResultSelect(result)}}
               //wsChangeProperty={(name:string,value:any) => { this.handleWSPropertyChange(name, value)}} 
               />
         </AccountContextProvider>
      )
   }
}