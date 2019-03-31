import { Model } from './Model';
import { AccessKey } from './AccessKey';
import { FetchoAPI, IResponse } from './FetchoAPI';


/**
 *
 *
 * @export
 * @interface IAccountProps
 */
export interface IPermissionProps {
}

export enum Permissions {
  None = 0,
  Owner = 1,
  Manage = 2,
  Read = 4,
  Write = 8,
  Max = 16
}

/**
 * @export
 * @class Account
 * @extends {Model}
 */
export class Permission {
    constructor(props?: IPermissionProps) {
    }

    public static check(checkValue: number){
      return {
        is : (isValue: Array<Permissions>) => {
          let bitOp = (checkValue & [4,16].reduce((acc,c) => (acc | c)) );
          return bitOp != 0;
        }
      }
    }

    public static None(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.None]);
    }

    public static isOwner(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.Owner]);
    }

    public static canManage(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.Manage]);
    }

    public static canRead(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.Read]);
    }

    public static canEdit(checkValue: number) {
      return Permission.check(checkValue).is([
        Permissions.Manage,
        Permissions.Owner,
      ]);
    }

    public static canWrite(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.Write]);
    }

    public static canMax(checkValue: number) {
      return Permission.check(checkValue).is([Permissions.Max]);
    }
}