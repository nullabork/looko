import { Model } from './Model';
import { FetchoAPI } from './FetchoAPI';
import { AccessKey } from './AccessKey';
import { Config } from '@Config/config'


 
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

interface IPager {
    count : number;
    offset : number;
    query : string;
};
export class ResultSet extends Model {

    public results?: Array<any>;
    public accessKey: AccessKey;
    
    public pager: IPager;
    public defaultPager: IPager;

    constructor(accessKey : AccessKey){
        super();
        this.results = [];
        this.accessKey = accessKey;

        this.defaultPager = {
            count : Config.pager.count,
            offset : Config.pager.offset,
            query : ""
        };

        this.pager = {
            count : Config.pager.count,
            offset : 0,
            query : ""
        };
    }

    setQuery(query : string) {
        this.pager.query =  encodeURIComponent(query);
    }

    getQuery() {
        return decodeURIComponent(this.pager.query);
    }
    

    fetch(cb : {(): void;}) {
        FetchoAPI.getResults({
            resultSet : this,
            cb : (body : any) => {
                this.results = [
                    // ...this.results,
                    ...body
                ];
                cb();
            }
        })
    }

    setPagerCount(count:number) : void {
        this.defaultPager.count = count;
        this.pager.count = count;
    }

    resetPager (){
        if(this.pager.count > this.accessKey.Workspace.ResultCount ) {
            this.pager.count = this.accessKey.Workspace.ResultCount;
        } else {
            this.pager.count =  this.defaultPager.count;
        }
    }


    next() : ResultSet {
        this.resetPager();
        this.pager.offset += this.pager.count;
        if(this.accessKey.Workspace.ResultCount - this.pager.count < this.pager.offset){
            this.pager.offset = this.accessKey.Workspace.ResultCount - this.pager.count;
        }

        return this;
    }

    prev() : ResultSet {
        this.resetPager();
        this.pager.offset -= this.pager.count;
        if(this.pager.offset < 0 ){
            this.pager.offset = 0;
        }
        return this;
    }

    max() : ResultSet {
        this.resetPager();
        this.pager.offset = this.accessKey.Workspace.ResultCount - this.pager.count;
        if(this.pager.offset < 0 ){
            this.pager.offset = 0;
        }
        return this;
    }
    
    zero() : ResultSet {
        this.resetPager();
        this.pager.offset = 0;
        return this;
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