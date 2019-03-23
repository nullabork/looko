import { Model } from './Model';
import { AccessKey } from './AccessKey';
import { FetchoAPI, IResponse } from './FetchoAPI';


/**
 *
 *
 * @export
 * @interface IAccountProps
 */
export interface IAccountProps {
    Name: string;
    Created: string;
    IsActive: boolean;
    AccessKeys: Array<AccessKey>;
}


/**
 * @export
 * @class Account
 * @extends {Model}
 */
export class Account extends Model {

    public Name: string;
    public Created?: string;
    public IsActive?: boolean;
    public AccessKeys?: Array<AccessKey>;

    /**
     *Creates an instance of Account.
     * @param {IAccountProps} [props]
     * @memberof Account
     */
    constructor(props?: IAccountProps) {
        super();
        if(!this.AccessKeys) this.AccessKeys = [];
        Account.assign(this, props);
    }

    public static assign(account: Account, props?: IAccountProps){
        if (props) {
            account.Name = props.Name || Account.GenerateID();
            account.Created = props.Created;
            account.IsActive = props.IsActive;
            if(!account.AccessKeys) account.AccessKeys = [];
            // account.AccessKeys = props.AccessKeys;
            
            let accessKeys = props.AccessKeys;
            if(accessKeys && accessKeys.length) {

                account.AccessKeys = [ 
                    ...account.AccessKeys,
                    ...accessKeys.map((ak) => {
                        return new AccessKey(ak);
                    })
                ]
            };
        }
    }

    public addAccessKey(ak : AccessKey){
        if(!this.AccessKeys) this.AccessKeys = [];
        this.AccessKeys.push(ak);
    }

    /**
     *
     *
     * @param {{ (response: IResponse): void; }} cb
     * @memberof Account
     */
    public loadAccount(cb: { (body: any): void; }) {
        FetchoAPI.getAccount({
            AccountData:  this,
            cb : (response : any) => {
                Account.assign(this, response);
                cb(response);
            }
        });
    }


    /**
     *
     *
     * @static
     * @param {string} evt
     * @param {{ (account: Account): void; }} cb
     * @memberof Account
     */
    public static on(evt: string, cb: { (account: Account): void; }) {
        Account.event.on(evt, cb);
    }

    /**
     *
     *
     * @static
     * @param {string} evt
     * @param {Account} data
     * @memberof Account
     */
    public static emit(evt: string, data: Account) {
        Account.event.emit(evt, data);
    }

}