import { CheckboxInput, DataRow, TextareaInput, TextInput } from '@Components/index';
import { AccountContextConsumer, AccountContextInterface } from '@Context/AccountContext';
import { AccessKey } from '@Models/AccessKey';
import * as React from 'react';


interface IWorkspaceDetailsProps {
  workspace: AccessKey;
}

export class WorkspaceDetails extends React.Component<IWorkspaceDetailsProps, {}> {

  public patchData: any;
  public saveQuery: any;

  constructor(props?: IWorkspaceDetailsProps) {
    super(props);
    this.patchData = {};
  }

  propChange(context: AccountContextInterface, name: string, value: any) {
    if (context.selectedAccessKey) {
      this.patchData[name] = value;

      context.set((state) => {
        state.selectedAccessKey.Workspace[name] = value;
        return state;
      });

      clearTimeout(this.saveQuery);
      this.saveQuery = setTimeout(() => {

        context.selectedAccessKey.PatchWorkspace(this.patchData, () => {
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
                id={s.selectedAccessKey.Workspace.Id + "-QueryText "}
                value={s.selectedAccessKey.Workspace.QueryText}
                onChange={(target: HTMLInputElement) => {
                  this.propChange(s, target.name, target.value);
                }} />

              <TextInput
                name="Name"
                label="Name"
                id={s.selectedAccessKey.Id + "-Name"}
                value={s.selectedAccessKey.Workspace.Name}
                onChange={(target: HTMLInputElement) => {
                  this.propChange(s, target.name, target.value);
                }} />

              <TextInput
                name="Description"
                label="Description"
                id={s.selectedAccessKey.Id + "-Description"}
                value={s.selectedAccessKey.Workspace.Description}
                onChange={(target: HTMLInputElement) => {
                  this.propChange(s, target.name, target.value);
                }} />

              <CheckboxInput
                name="IsActive"
                label="Is Active"
                id={s.selectedAccessKey.Id + "-IsActive"}
                checked={s.selectedAccessKey.Workspace.IsActive}
                onChange={(target: HTMLInputElement) => {
                  this.propChange(s, target.name, target.checked ? true : false);
                }} />

              <CheckboxInput
                name="IsWellknown"
                label="Is Wellknown"
                id={s.selectedAccessKey.Id + "-IsWellknown"}
                checked={s.selectedAccessKey.Workspace.IsWellknown}
                onChange={(target: HTMLInputElement) => {
                  this.propChange(s, target.name, target.checked ? true : false);
                }} />

              <DataRow label="Workspace Id" data={s.selectedAccessKey.Workspace.WorkspaceId} />
              <DataRow label="Result Count" data={s.selectedAccessKey.Workspace.ResultCount} />
              <DataRow label="Created" data={s.selectedAccessKey.Workspace.Created} />
            </div>

          )}
        </AccountContextConsumer>
      </div>
    )
  }
}


