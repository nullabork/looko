import * as React from 'react';
import IDashboardProps from './IDashboardProps';
import { Workspace } from '@Models/Workspace';

export class Dashboard extends React.Component<IDashboardProps, {}> {

   public ws: Workspace;

   constructor(props?: IDashboardProps){
      super(props);

      this.ws = new Workspace({id : props.workspace});

      if(!this.props.workspace) {
         this.props.history.push(`/Dashboard/${this.ws.id}`)
      }
   }
   render() {
      return <h1>Workspace {this.ws.id} </h1>
   }
}