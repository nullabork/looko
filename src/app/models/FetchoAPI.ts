import { Model } from './Model';
import * as request from 'request';
import rp from 'request-promise-native';
import { Config } from '@Config/config';
import { AccessKey } from './AccessKey';
import { Account } from './Account';
import { ResultSet } from './ResultSet';

export interface IWorkspacesProps {
    accessKey? : string;
}

export interface IResponse {
    body : any
}

export interface IRequest  {
     cb: {(body:any, response:string): void;}
}

export interface IResults extends IRequest  {
    resultSet : ResultSet;
}

export interface ICreateAccount  extends IRequest  {
    AccountData: Account;
}

export interface IGetAccount  extends IRequest  {
    Name: string;
}

export interface ICreateAccessKey  extends IRequest  {
    AccessKeyData : {
        AccountName: string,
        Name : string, 
        [index: string]: any; 
    };
}

export interface IGetAccessKey  extends IRequest  {
    AccessKeyID: string;
}

export interface IDeleteQuery extends IRequest  {
    AccessKeyID: string;
    QueryText: string;
}



export interface IPatchData {
    [index: string]: any;
}

export interface IPatchWorkspace  extends IRequest  {
    Patch : IPatchData;
}


export class FetchoAPI extends Model {
    
    public static createAccount( props : ICreateAccount ) {

        var PostOpts = {
            method: 'POST',
            uri: `${Config.api}/accounts`,
            body: props.AccountData,
            json: true // Automatically stringifies the body to JSON
        };

        rp(PostOpts)
            .then((body : any) => {
                props.cb(body, "200")
            });
    }

    // public static getAccount( props : ICreateAccount ) {
    //     let endpoint = `${Config.api}/accounts/${props.AccountData.Name}`;
    //     request.get(endpoint, (response : any, body : any, error : any) => {
    //         props.cb( {response, body, error} );
    //     });
    // }

    public static getAccount( props : ICreateAccount ) {
        
        var GetOpts = {
            method: 'GET',
            uri: `${Config.api}/accounts/${props.AccountData.Name}`,
            json: true
        };

        rp(GetOpts)
            .then((body : any) => {
                props.cb(body, "200")
            })
            .catch((err : any) => {
                FetchoAPI.createAccount(props);
            });

    }


    public static getAccessKey( props : IGetAccessKey ) {
        
        var GetOpts = {
            method: 'GET',
            uri: `${Config.api}/accesskey/${props.AccessKeyID}`,
            json: true
        };

        rp(GetOpts)
            .then((body : any) => {
                props.cb(body, "200")
            })
            .catch((err : any) => {
                
            });

    }

    public static createAccessKey(props : ICreateAccessKey) {
        let endpoint = `${Config.api}/accesskeys`;

        var PostOpts = {
            method: 'POST',
            uri: `${Config.api}/accesskeys`,
            body: props.AccessKeyData,
            json: true // Automatically stringifies the body to JSON
        };


        rp(PostOpts)
            .then((body : any) => {
                props.cb(body, "200")
            });
    }

    public static deleteTransform(props : IDeleteQuery) {
        let endpoint = `${Config.api}/accesskeys`;

        var PutOpts = {
            method: 'PUT',
            uri: `${Config.api}/accesskey/${props.AccessKeyID}/results/transform`,
            body: {
                Action: "DeleteByQueryText",
                QueryText : props.QueryText
            },
            json: true 
        };


        rp(PutOpts)
            .then((body : any) => {
                props.cb(body, "200")
            });
    }
    


    public static getResults( props : IResults ) {

        let params = [
            `offset=${props.resultSet.pager.offset}`,
            `count=${props.resultSet.pager.count}`,
            `query=${props.resultSet.pager.query}`
        ]
        
        var GetOpts = {
            method: 'GET',
            uri: `${Config.api}/accesskey/${props.resultSet.accessKey.Id}/results?${params.join('&')}`,
            json: true
        };

        rp(GetOpts)
            .then((body : any) => {
                if(body.Results) {
                    body = body.Results;
                }

                props.cb(body, "200");
            })
            .catch((err : any) => {
            });

    }


    public static patchWorkspace( AccessKeyID: string, patch : IPatchWorkspace) {
        let endpoint = `${Config.api}/accesskey/${AccessKeyID}`;

        var PatchOpts = {
            method: 'PATCH',
            uri: endpoint,
            body: patch.Patch,
            json: true, // Automatically stringifies the body to JSON
        };

        rp(PatchOpts)
            .then((body : any) => {
                patch.cb(body, "200");
            }).catch((err : any) => {
                patch.cb(err.response.body, err.statusCode);

            });
    }



    // public static createAccessKeyWorkspaceLink(props : ICreateAccessKey) {
    //     let endpoint = `${Config.api}/accesskeys`;

    //     request.post(endpoint, props.AccessKeyData ,(response : any, body : any, error : any) => {
    //         props.cb( {response, body, error} );
    //     });
    // }

    // public static getAccessKey(props : IGetAccessKey) {
    //     let endpoint = `${Config.api}/accesskey/${props.AccessKeyID}`;

    //     request.get(endpoint, (response : any, body : any, error : any) => {
    //         props.cb( {response, body, error} );
    //     });
    // }

    // public static updateWorkspace(props : IUpdateWorkspace) {
    //     let endpoint = `${Config.api}/accesskeys`;

    //     request.put(endpoint, props.AccessKeyWorkspace, (response : any, body : any, error : any) => {
    //         props.cb( {response, body, error} );
    //     });
    // }
}