import { Page, PageLeft, Pagination, ResultDetails, ResultRow, Results, WorkspaceDetails, WorkspaceToolbar } from '@Components/index';
import { AccountContextConsumer } from '@Context/AccountContext';
import { AccessKey, IResult, Types, Permission } from '@Models/index';
import * as React from 'react';


require("./sass/dashboard.scss");


interface DashboardViewProps {
  onNewAccessKey?: { (): void; };
  onResultSelect?: { (result: IResult): void; };
  //wsChangeProperty : {(name :string, value : any) : void}
}

let sortWorkspaceOrder = (aAK: AccessKey, bAK: AccessKey) => {
  let p1 = Permission.canEdit(aAK.Permissions),
    p2 = Permission.canEdit(bAK.Permissions);

  if ( p1 && !p2) {
    return 1;
  } else if(!p1 && p2) {
    return -1;
  }
  
  return bAK.getCreateDate().getTime() - aAK.getCreateDate().getTime()
}


export const DashboardView = (props: DashboardViewProps) => (
  <AccountContextConsumer>
    {s => s && (
      <Page>

        <PageLeft collapsed={s.leftMainCollapsed} />

        {s.selectedAccessKey ?
          <div className='col-6 d-flex flex-column vh-100 d-flex bd-highlight p-0 m-0'>

            <WorkspaceToolbar selectedAccessKey={s.selectedAccessKey} />

            <Results>
              {s.selectedAccessKey.ResultSet.results.length ?

                s.selectedAccessKey.ResultSet.results.map((rw: IResult) => {
                  return <ResultRow
                    key={rw.UriHash + rw.DataHash + rw.Description}
                    result={rw}
                    selectedWorkspace={s.selectedResult && s.selectedResult.UriHash == rw.UriHash}
                    onSelect={props.onResultSelect} />
                })

                : null}
            </Results>

            <Pagination selectedAccessKey={s.selectedAccessKey} />

          </div>
        : null}

        <div className='overflow-auto p-2 col bg-light vh-100 border-left border-info'>
          <div className=''>

            {s.detailsView == Types.RESULT ? <ResultDetails result={s.selectedResult} /> : null}
            {
              s.detailsView == Types.WORKSPACE ? (
                <WorkspaceDetails
                  //wsChangeProperty={props.wsChangeProperty}
                  workspace={s.selectedAccessKey} />
              ) : null
            }
          </div>
        </div>

      </Page>
    )}
  </AccountContextConsumer>
);