

import * as React from 'react';

import IDashboardProps from './IDashboardProps';
import { Workspace, AccessKey, IResult} from '@Models/index';
import { 
  Page,
  Icon,
  Workspaces,
  WorkspaceRow,
  Results,
  ResultRow
} from '@Components/index';

require("./sass/dashboard.scss");
 
import { 
  AccountContextConsumer
} from '@Context/AccountContext';


interface DashboardViewProps {
  handleSelectAccessKey? : {(active:AccessKey): void;}
  onNewAccessKey? : {(): void;}
  onResultSelect? : {(result:IResult): void;}
  
}


export const DashboardView = (props: DashboardViewProps) => (
    <AccountContextConsumer>
      {s => s && (
          <Page>
              <Workspaces>
                {
                  s.account.AccessKeys.map( (ak : AccessKey) => {
                      return <WorkspaceRow key={ak.Id}
                        AccessKey={ak}
                        onSelect={props.handleSelectAccessKey} />
                  })
                }
              </Workspaces>

              { s.active &&
                  <div className='col-6 d-flex flex-column vh-100 d-flex bd-highlight m-0'>
                    
                    {/* <div>
                      <div>
                        asd asd asd asdasd asd sd asddasd asd sad sadasd ads asd asd
                          asd as asd<div> asd asd sadsad asd ads asd asd asd asd asd 
                         asd ads asd asd asdasd dsa asdasdasd asd</div>
                      </div>
                    </div> */}

                    <h2 className='p-2'>{s.active.Name}</h2>
                    <div className='overflow-auto p-2'>
                      <Results>

                        {
                          s.active.ResultSet.results.map((rw : IResult) => {
                              return <ResultRow 
                                key={rw.UriHash} 
                                result={rw}
                                active={s.activeResult && s.activeResult.UriHash == rw.UriHash}
                                onSelect={props.onResultSelect}
                                />
                          })
                        }
                        
                      </Results>
                    </div>
                </div>
              }

{/* DataHash: string;
    UriHash: string;
    URI: string;
    RefererUri: string;
    Uri: string;
    Title: string;
    Description: string;
    Tags: any,
    Created: string;
    PageSize: string;
    Sequence: number; */}
    
              <div className='col bg-light vh-100 border-left border-info'>
                <h2>
                  Details
                </h2>
                { s.activeResult && 
                  <div className='detaiols'>

                    {
                      ["DataHash",
                        "UriHash",
                        "RefererUri",
                        "Uri",
                        "Title",
                        "Description",
                        "Tags",
                        "Created",
                        "PageSize",
                        "Sequence"].map((key:string) => {
                          return <div key={key + s.active.Name} className="border-bottom p-0">
                            <dl>
                                <dt><small>{key} : </small></dt>
                                <dd><small>{ s.activeResult[key] }</small></dd>

                            </dl>
                          </div>
                        })
                    }
                    
                  </div>
                }
              </div>
          </Page>
      )} 
    </AccountContextConsumer>
);