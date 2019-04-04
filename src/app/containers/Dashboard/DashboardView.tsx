

import * as React from 'react';
import { parse } from 'date-fns';

import IDashboardProps from './IDashboardProps';
import { Workspace, AccessKey, IResult, Types, Permission, Permissions} from '@Models/index';
import { 
  Page,
  Icon,
  PageLeft,
  Results,
  ResultRow,
  ResultDetails,
  WorkspaceDetails,
  Pagination,
  WorkspaceToolbar
} from '@Components/index';

require("./sass/dashboard.scss");
 
import { 
  AccountContextConsumer
} from '@Context/AccountContext';

interface DashboardViewProps {
  onNewAccessKey? : {(): void;};
  onResultSelect? : {(result:IResult): void;};
  //wsChangeProperty : {(name :string, value : any) : void}
}

let sortWorkspaceOrder = (aAK :  AccessKey, bAK : AccessKey) => bAK.getCreateDate().getTime() - aAK.getCreateDate().getTime();

export const DashboardView = (props: DashboardViewProps) => (
    <AccountContextConsumer>
      {s => s && (
          <Page>

            <PageLeft />

              { s.selectedWorkspace && s.selectedWorkspace.ResultSet.results.length ?
                  <div className='col-6 d-flex flex-column vh-100 d-flex bd-highlight p-0 m-0'>

                    <WorkspaceToolbar selectedAccessKey={s.selectedWorkspace} />
                
                    
                      <Results>

                        {
                          s.selectedWorkspace.ResultSet.results.map((rw : IResult) => {
                            return <ResultRow 
                              key={rw.UriHash + rw.DataHash + rw.Description}
                              result={rw}
                              selectedWorkspace={s.selectedResult && s.selectedResult.UriHash == rw.UriHash}
                              onSelect={props.onResultSelect} />
                          })
                        }
                        
                      </Results>
                    
                    <Pagination selectedAccessKey={s.selectedWorkspace} />

                </div>
              : null }

              <div className='overflow-auto p-2 col bg-light vh-100 border-left border-info'>
                <div className=''>
                  
                  { s.detailsView == Types.RESULT ? <ResultDetails result={s.selectedResult} /> : null }
                  {
                     s.detailsView == Types.WORKSPACE ? (
                      <WorkspaceDetails
                        //wsChangeProperty={props.wsChangeProperty}
                        workspace={s.selectedWorkspace} />
                    ) : null 
                  }
                </div>
              </div>

          </Page>
      )} 
    </AccountContextConsumer>
);