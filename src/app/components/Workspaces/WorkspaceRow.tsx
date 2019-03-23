import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';

interface IWorkspaceRowProps {
   AccessKey: AccessKey;
   onSelect?: {(ak:AccessKey): void;}
}

export const WorkspaceRow = (props: IWorkspaceRowProps) => (
   <div className="" onClick={() => props.onSelect(props.AccessKey) }>
      {
         props.AccessKey.Name
      }
   </div>
);