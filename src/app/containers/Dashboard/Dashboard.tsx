import * as React from 'react';
import IDashboardProps from './IDashboardProps';
import { Workspace } from '@Models/Workspace';
import { 
   WorkspaceContextProvider,
   WorkspaceContextInterface
} from '@Context/WorkspaceContext';

import { DashboardView } from './DashboardView';

export class Dashboard extends React.Component<IDashboardProps, {}> {

   public ws: Workspace;
   public state: WorkspaceContextInterface;

   constructor(props?: IDashboardProps){
      super(props);

      this.state = {
         workspace : new Workspace({id : props.workspace})
      };

      if(!this.props.workspace) {
         this.props.history.push(`/Dashboard/${this.ws.id}`)
      }
   }

   handleClick() {
      console.log('what');
      this.state.workspace.id = "balls";

      this.setState({
         workspace : {
            id : "balls"
         }
      })
   }

   render() {
      
      return (
         <WorkspaceContextProvider value={this.state}>
           <DashboardView onClick={ () => this.handleClick }/>
         </WorkspaceContextProvider>
      )
   }
}