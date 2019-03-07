import { Model } from './Model';

interface IWorkspaceProps {
    id? : string;
}

export class Workspace extends Model{
    public id: string;

    constructor({id} : IWorkspaceProps){
        super();
        this.id = id || Workspace.GenerateID();
    }
}