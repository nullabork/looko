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
     cb: {(body:any): void;}
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

export interface IUpdateWorkspace  extends IRequest  {
    AccessKeyWorkspace: AccessKey;
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
                props.cb(body)
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
                props.cb(body)
            })
            .catch((err : any) => {
                FetchoAPI.createAccount(props);
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
                props.cb(body)
            });
    }


    public static getResults( props : IResults ) {

        let params = [
            `offset=${props.resultSet.pager.offset}`,
            `count=${props.resultSet.pager.count}`
        ]
        
        var GetOpts = {
            method: 'GET',
            uri: `${Config.api}/accesskey/${props.resultSet.accessKey.Id}/results?${params.join('&')}`,
            json: true
        };

        rp(GetOpts)
            .then((body : any) => {
                props.cb(body);
            })
            .catch((err : any) => {
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