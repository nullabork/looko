import React, { Component, ReactNode } from 'react';
import { AccessKey, Permission, Permissions } from '@Models/index';

import { Icon } from '@Components/Icon';

interface IWorkspaceRowProps {
   AccessKey: AccessKey;
   onSelect?: {(ak:AccessKey): void;}
   isActive: boolean;
}

export const WorkspaceRow = (props: IWorkspaceRowProps) => {
   let canEdit = Permission.canEdit(props.AccessKey.Permissions);
   return (
      <div 
         className={[
            "lk-workspace-row",
            props.isActive ? "lk-workspace-row--active" : "",
            !canEdit ? "lk-workspace-row--no-edit" : ""
            ].join(' ')}
            onClick={() => props.onSelect(props.AccessKey) }>
         
         <div className="lk-workspace-row--content">
            {
               canEdit? 
               <Icon name='edit-2' width="14" height="14" className='lk-icon-circle lk-icon-circle--small'/>
               : 
               <Icon name='lock' width="14" height="14" className='lk-icon-circle lk-icon-circle--small'/>
            }
            
            {
               props.AccessKey.Workspace.Name
            }
            {/* <div><small> { props.AccessKey.getCreateDate().toDateString() }</small></div> */}
            <div className="lk-workspace-row--underline"></div>
         </div>
      </div>
   );
};