import * as React from 'react';
import { 
   AccountContextProvider,
   AccountContextInterface,
   AccountContextConsumer
} from '@Context/AccountContext';

import { AccessKey } from '@Models/AccessKey';
import { TextInput, IFormField, TextareaInput, CheckboxInput, DataRow } from '@Components/index';

interface IWorkspaceDetailsProps {
   workspace: AccessKey;
   //wsChangeProperty : {(name :string, value : any) : void}

}
   
export class WorkspaceDetails extends React.Component<IWorkspaceDetailsProps, {}> {
      
   public patchData : any;
   public saveQuery : any;

   constructor(props?: IWorkspaceDetailsProps){
      super(props);
      this.patchData = {};
   }

   propChange(context:AccountContextInterface,name:string, value:any){
      if(context.selectedWorkspace){
         this.patchData[name] = value;
         
         context.set((state) => {
            state.selectedWorkspace.Workspace[name] = value;
         });

         clearTimeout(this.saveQuery);
         this.saveQuery = setTimeout(() => {

            context.selectedWorkspace.PatchWorkspace(this.patchData,() => {
               console.log('updated');
            });

            this.patchData = {};
         }, 1000);
      }
   }

   render() {
      return (

         <div className=''>
            <h2>
               Workspace Details
            </h2>
            
            <AccountContextConsumer>
            
               {s => s && (
                  <div className='detaiols'>
                     <TextareaInput 
                        name="QueryText"  
                        label="Query Text"
                        id={s.selectedWorkspace.Workspace.Id + "-QueryText "}
                        value={s.selectedWorkspace.Workspace.QueryText} 
                        onChange={(target : HTMLInputElement) => {
                           this.propChange(s, target.name, target.value);
                        }} />

                     <TextInput 
                        name="Name" 
                        label="Name"
                        id={s.selectedWorkspace.Id + "-Name"}
                        value={s.selectedWorkspace.Workspace.Name} 
                        onChange={(target : HTMLInputElement) => {
                           this.propChange(s, target.name, target.value);
                        }} />

                     <TextInput 
                        name="Description" 
                        label="Description"
                        id={s.selectedWorkspace.Id + "-Description"}
                        value={s.selectedWorkspace.Workspace.Description} 
                        onChange={(target : HTMLInputElement) => {
                           this.propChange(s, target.name, target.value);
                        }} /> 
                     
                     <CheckboxInput 
                        name="IsActive" 
                        label="Is Active"
                        id={s.selectedWorkspace.Id + "-IsActive"}
                        checked={s.selectedWorkspace.Workspace.IsActive} 
                        onChange={(target : HTMLInputElement) => {
                           this.propChange(s, target.name, target.checked ? true : false);
                        }} />

                     <CheckboxInput 
                        name="IsWellknown" 
                        label="Is Wellknown"
                        id={s.selectedWorkspace.Id + "-IsWellknown"}
                        checked={s.selectedWorkspace.Workspace.IsWellknown} 
                        onChange={(target : HTMLInputElement) => {
                           this.propChange(s, target.name, target.checked ? true : false);
                        }} />

                     <DataRow label="Workspace Id" data={s.selectedWorkspace.Workspace.WorkspaceId} />
                     <DataRow label="Result Count" data={s.selectedWorkspace.Workspace.ResultCount} />
                     <DataRow label="Created" data={s.selectedWorkspace.Workspace.Created} />
                  </div>
               
               )}
            </AccountContextConsumer>
         </div>
      )
   }
}

