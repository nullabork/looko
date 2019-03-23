import { Model } from './Model';
import { AccessKey } from './AccessKey';
import { FetchoAPI, IResponse } from './FetchoAPI';


/**
 * @export
 * @class Account
 * @extends {Model}
 */
export class Result extends Model {

    

    /**
     *
     *
     * @static
     * @param {string} evt
     * @param {{ (account: Account): void; }} cb
     * @memberof Account
     */
    public static on(evt: string, cb: { (account: Account): void; }) {

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

    }

}