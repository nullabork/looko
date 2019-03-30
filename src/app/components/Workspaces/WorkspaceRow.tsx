import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';
import { Icon } from '@Components/Icon';

interface IWorkspaceRowProps {
   AccessKey: AccessKey;
   onSelect?: {(ak:AccessKey): void;}
   isActive: boolean;
}

export const WorkspaceRow = (props: IWorkspaceRowProps) => (
   <div className={["lk-workspace-row", props.isActive ? "lk-workspace-row--active" : ""].join(' ')} onClick={() => props.onSelect(props.AccessKey) }>
      {
         props.AccessKey.Workspace.Name
      }
      <div className="lk-workspace-row--underline"></div>
   </div>
);