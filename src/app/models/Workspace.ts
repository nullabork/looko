import { Model } from './Model';

interface IWorkspace {
    id? : string;
}

export class Workspace extends Model{
    public id: string;

    constructor({id} : IWorkspace){
        super();
        this.id = id || Workspace.GenerateID();
    }
}