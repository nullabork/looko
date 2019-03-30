import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';
import { TextInput, IFormField, TextareaInput, CheckboxInput, DataRow } from '@Components/index';

interface IWorkspaceDetailsProps {
   workspace: AccessKey;
   wsChangeProperty : {(name :string, value : any) : void}

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

            <TextareaInput 
               name="QueryText"  
               label="Query Text"
               id={props.workspace.Id + "-QueryText "}
               value={props.workspace.Workspace.QueryText} 
               onChange={(target : HTMLInputElement) => {
                  props.wsChangeProperty(target.name, target.value);
               }} />

            <TextInput 
               name="Name" 
               label="Name"
               id={props.workspace.Id + "-Name"}
               value={props.workspace.Workspace.Name} 
               onChange={(target : HTMLInputElement) => {
                  props.wsChangeProperty(target.name, target.value);
               }} />

            <TextInput 
               name="Description" 
               label="Description"
               id={props.workspace.Id + "-Description"}
               value={props.workspace.Workspace.Description} 
               onChange={(target : HTMLInputElement) => {
                  props.wsChangeProperty(target.name, target.value);
               }} /> 
            
            <CheckboxInput 
               name="IsActive" 
               label="Is Active"
               id={props.workspace.Id + "-IsActive"}
               checked={props.workspace.Workspace.IsActive} 
               onChange={(target : HTMLInputElement) => {
                  props.wsChangeProperty(target.name, target.checked ? true : false);
               }} />

            <CheckboxInput 
               name="IsWellknown" 
               label="Is Wellknown"
               id={props.workspace.Id + "-IsWellknown"}
               checked={props.workspace.Workspace.IsWellknown} 
               onChange={(target : HTMLInputElement) => {
                  props.wsChangeProperty(target.name, target.checked ? true : false);
               }} />

            <DataRow label="Workspace Id" data={props.workspace.Workspace.WorkspaceId} />
            <DataRow label="Result Count" data={props.workspace.Workspace.ResultCount} />
            <DataRow label="Created" data={props.workspace.Workspace.Created} />
         </div>
      }
   </div>
}

