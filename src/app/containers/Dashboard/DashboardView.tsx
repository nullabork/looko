

import * as React from 'react';
import IDashboardProps from './IDashboardProps';
import { Workspace } from '@Models/Workspace';
import { 
   WorkspaceContextProvider,
   WorkspaceContextInterface,
   WorkspaceContextConsumer
} from '@Context/WorkspaceContext';


interface DashboardViewProps {
  onClick : {(): void;}
}


export const DashboardView = (props: DashboardViewProps) => (
    <WorkspaceContextConsumer>
        {state => state && (
          <h1 onClick={ () => props.onClick() } >Workspace {state.workspace.id} </h1>
        )}
    </WorkspaceContextConsumer>
);