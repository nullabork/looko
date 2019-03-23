import { Model } from './Model';
import { FetchoAPI } from './FetchoAPI';
import { AccessKey } from './AccessKey';


 
 export interface IResult {
    DataHash: string;
    UriHash: string;
    URI: string;
    RefererUri: string;
    Uri: string;
    Title: string;
    Description: string;
    Tags: any,
    Created: string;
    PageSize: string;
    Sequence: number;
    [propName: string]: any;
 }


/**
 * @export
 * @class Account
 * @extends {Model}
 */
export class ResultSet extends Model {

    public results?: Array<any>;
    public accessKey: AccessKey;
    
    public pager: {
        count : number;
        offset : number;
    };

    constructor(accessKey : AccessKey){
        super();
        this.results = [];
        this.accessKey = accessKey;

        this.pager = {
            count : 100,
            offset : 0
        };
    }


    next(cb : {(): void;}) {

        if(!this.results.length) {
            this.pager.offset = 0;
        } else {
            this.pager.offset += this.pager.count;
        }


        FetchoAPI.getResults({
            resultSet : this,
            cb : (body : any) => {
                this.results = [
                    ...this.results,
                    ...body
                ];
                cb();
            }
        })
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