

import { ResultSet } from './ResultSet';
import { Account } from './Account';
import { Model } from './Model';
import { Workspace } from './Workspace';
import { FetchoAPI, IPatchData } from './FetchoAPI';

export interface IAccessKeyProps {
    Name? : string;
    Id? : string;
    AccountName? : string;
    Expiry? : string;
    Created? : string;
    IsWellknown? : boolean;
    Permissions? : number;
    IsActive? : boolean;
    Workspace?: Workspace; //for making requests with
}
export class AccessKey extends Model {
    
    public Name: string;
    public Id : string;
    public AccountName : string;
    public Expiry : string;
    public Created : string;
    public IsWellknown : boolean;
    public Permissions : number;
    public IsActive : boolean;
    public Workspace: Workspace; //for making requests with
    public ResultSet?: ResultSet;

    constructor( props?: IAccessKeyProps){
        super();
        this.assign(props);
        this.ResultSet = new ResultSet(this);
        //this.Name  = props.Name || AccessKey.GenerateID();
    }

    public static assign(accessKey: AccessKey, props?: IAccessKeyProps){
        if (props) {
            accessKey.Name = props.Name || Account.GenerateID();
            accessKey.Id = props.Id;
            accessKey.AccountName = props.AccountName;
            accessKey.Expiry = props.Expiry;
            accessKey.Created = props.Created;
            accessKey.IsWellknown = props.IsWellknown;
            accessKey.Permissions = props.Permissions;
            accessKey.IsActive = props.IsActive;

            let ws = props.Workspace;
            if(ws) {
                accessKey.Workspace = new Workspace(ws);
            };


        }
    }

    public assign(props?: IAccessKeyProps){
        AccessKey.assign(this, props);
    }

    public loadAccessKey(account : Account,  cb : {(accessKey: AccessKey): void;}) {
        FetchoAPI.createAccessKey({
            AccessKeyData : {
                AccountName : account.Name,
                Name: this.Name
            },
            cb : (response : any) => {
                this.assign(response);
                cb(this);
            }
        });
    }


    public Patch(patchData: IPatchData ,cb : {(accessKey: AccessKey): void;}) {
        // FetchoAPI.patchWorkspace(
        //     this.Id,
        //     {
        //         Patch : patchData,
        //         cb : (response : any) => {
        //             this.assign(response);
        //             cb(this);
        //         }
        //     }
        // );
    }


    public PatchWorkspace(patchData: IPatchData ,cb : {(accessKey: AccessKey): void;}) {
        FetchoAPI.patchWorkspace(
            this.Id,
            {
                Patch : patchData,
                cb : (response : any) => {
                    this.assign(response);
                    cb(this);
                }
            }
        );
    }

    public static on(evt : string, cb : {(account: Account): void;}){
        AccessKey.event.on( evt, cb ); 
    }

    public static emit(evt : string, data : Account ){
        AccessKey.event.emit( evt, data );
    }

    public toJSON(){
        var json = {
            ...this
        };

        delete json['ResultSet'];
        return json;
    }

}