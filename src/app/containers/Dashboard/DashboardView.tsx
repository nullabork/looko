

import * as React from 'react';

import IDashboardProps from './IDashboardProps';
import { Workspace, AccessKey, IResult, Types} from '@Models/index';
import { 
  Page,
  Icon,
  Workspaces,
  WorkspaceRow,
  Results,
  ResultRow,
  ResultDetails,
  WorkspaceDetails
} from '@Components/index';

require("./sass/dashboard.scss");
 
import { 
  AccountContextConsumer
} from '@Context/AccountContext';

interface DashboardViewProps {
  handleSelectAccessKey? : {(selectedWorkspace:AccessKey): void;}
  onNewAccessKey? : {(): void;};
  onResultSelect? : {(result:IResult): void;};
  onWorkspaceConfig? : {(): void;};
  wsChangeProperty : {(name :string, value : any) : void}
}

export const DashboardView = (props: DashboardViewProps) => (
    <AccountContextConsumer>
      {s => s && (
          <Page>
              <Workspaces>
                {
                  s.account.AccessKeys.map( (ak : AccessKey) => {
                      return <WorkspaceRow 
                        key={ak.Id}
                        AccessKey={ak}
                        onSelect={props.handleSelectAccessKey}
                        isActive={ (s.selectedWorkspace && s.selectedWorkspace.Name == ak.Name) } />
                  })
                }
              </Workspaces>

              { s.selectedWorkspace &&
                  <div className='col-6 d-flex flex-column vh-100 d-flex bd-highlight m-0'>

                    <h2 className='p-2'>
                      {s.selectedWorkspace.Name}
                      <Icon name='settings' onClick={ props.onWorkspaceConfig }/>
                    </h2>
                    
                    <div className='overflow-auto p-2'>
                      <Results>

                        {
                          s.selectedWorkspace.ResultSet.results.map((rw : IResult) => {
                            return <ResultRow 
                              key={rw.UriHash} 
                              result={rw}
                              selectedWorkspace={s.selectedResult && s.selectedResult.UriHash == rw.UriHash}
                              onSelect={props.onResultSelect}
                              />
                          })
                        }
                        
                      </Results>
                    </div>
                </div>
              }

              <div className='overflow-auto p-2 col bg-light vh-100 border-left border-info'>
                <div className=''>
                  
                  { s.detailsView == Types.RESULT ? <ResultDetails result={s.selectedResult} /> : null }
                  {
                     s.detailsView == Types.WORKSPACE ? (
                      <WorkspaceDetails
                        wsChangeProperty={props.wsChangeProperty}
                        workspace={s.selectedWorkspace} />
                    ) : null 
                  }
                </div>
              </div>

          </Page>
      )} 
    </AccountContextConsumer>
);