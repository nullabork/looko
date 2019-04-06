

import { ResultSet } from './ResultSet';
import { Account } from './Account';
import { Model } from './Model';
import { Workspace } from './Workspace';
import { FetchoAPI, IPatchData } from './FetchoAPI';
import { Permission, Permissions } from './Permission';

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
    Revision?: number;
    CreatedDate? : Date;
    Selected? : boolean;
    
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
    public Revision: number;

    constructor( props?: IAccessKeyProps){
        super();
        this.assign(props);
        this.ResultSet = new ResultSet(this);

        if(! this.Name ){
            // this.Name = AccessKey.GenerateID();
        }

        if(! this.Workspace ){
            this.Workspace = new Workspace({
                Name : AccessKey.GenerateID(3)
            });
        }
        
    }

    public static assign(accessKey: AccessKey, props?: IAccessKeyProps){
        if (props) {
            accessKey.Name = props.Name || AccessKey.GenerateID();
            accessKey.Id = props.Id;
            accessKey.AccountName = props.AccountName;
            accessKey.Expiry = props.Expiry;
            accessKey.Created = props.Created;
            accessKey.IsWellknown = props.IsWellknown;
            accessKey.Permissions = props.Permissions;
            accessKey.IsActive = props.IsActive;
            accessKey.Revision = props.Revision;
            let ws = props.Workspace;
            if(ws) {
                accessKey.Workspace = new Workspace(ws);
            };
        }
    }

    public assign(props?: IAccessKeyProps){
        AccessKey.assign(this, props);
    }

    public createAccessKey(account : Account,  cb : {(accessKey: AccessKey): void;}) {
        FetchoAPI.createAccessKey({
            AccessKeyData : {
                AccountName : account.Name,
                Name: this.Name,
                Workspace : this.Workspace
            },
            cb : (response : any) => {
                this.assign(response);
                cb(this);
            }
        });
    }

    public update(cb : {(accessKey: AccessKey): void;}) {
        FetchoAPI.getAccessKey({
            AccessKeyID : this.Id,
            cb : (response : any) => {
                this.assign(response);
                cb(this);
            }
        });
    }

    // public can(){
    //     Permission.canEdit()
    // }

    public Patch(patchData: IPatchData ,cb : {(accessKey: AccessKey): void;}) {

    }


    public PatchWorkspace(patchData: IPatchData ,cb : {(accessKey: AccessKey): void;}) {
        FetchoAPI.patchWorkspace(
            this.Id,
            {
                Patch : {
                    Revision : this.Revision,
                    Workspace : {
                        ...patchData,
                        Revision : this.Workspace.Revision
                    }
                },
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