import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';

interface IWorkspaceDetailsProps {
   workspace: AccessKey;
}
   {/* 
    id: string;
    WorkspaceId: string;
    Name: string;
    Description: string;
    QueryText: string;
    Created: string;
    IsActive: boolean;
    IsWellknown: boolean;
    ResultCount: number;
   */}


export const WorkspaceDetails = (props: IWorkspaceDetailsProps) => {

   return <div className=''>
      <h2>
         Workspace Details
      </h2>
      
      

      { props.workspace && 
         <div className='detaiols'>
            <textarea className="w-100" value={props.workspace.Workspace.QueryText}></textarea>
            
            {  
               ["id",
               "WorkspaceId",
               "Name",
               "Description",
               "Title",
               "Description",
               "Created",
               "IsActive",
               "IsWellknown",
               "ResultCount"].map((key:string) => {
                  return <div key={key + props.workspace.Workspace.id } className="border-bottom p-0">
                     <dl>
                        <dt><small>{key} : </small></dt>
                        <dd><small>{ props.workspace.Workspace[key] }</small></dd>
                     </dl>
                  </div>
               })
            }

            <button type="button" className="btn btn-primary btn-lg">Save</button>
         </div>
      }
   </div>
}

