import * as React from 'react';
import { Workspace } from '@Models/Workspace';

export interface WorkspaceContextInterface {
  workspace: Workspace
}

const context = React.createContext<WorkspaceContextInterface | null>(null);

export const WorkspaceContextProvider = context.Provider;
  
export const WorkspaceContextConsumer = context.Consumer;