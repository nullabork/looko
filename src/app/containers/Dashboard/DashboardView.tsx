import { Page, PageLeft, Pagination2, ResultDetails, ResultRow, Results, WorkspaceDetails, WorkspaceToolbar } from '@Components/index';
import { AccountContextConsumer, AccountContextInterface } from '@Context/AccountContext';
import { AccessKey, IResult, Types, Permission } from '@Models/index';
import * as React from 'react';


require("./sass/dashboard.scss");


interface DashboardViewProps {
  onNewAccessKey?: { (): void; };
  onResultSelect?: { (result: IResult): void; };
  //wsChangeProperty : {(name :string, value : any) : void}
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

            <Pagination2 
              resultSet={s.selectedAccessKey.ResultSet}
              resultCount={s.selectedAccessKey.Workspace.ResultCount}
              update={() => { s.set( (state : AccountContextInterface ) => state ) }} />

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