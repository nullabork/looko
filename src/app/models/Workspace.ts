import { AccessKey } from './AccessKey';
import { Model } from './Model';
import { FetchoAPI } from './FetchoAPI';
import { parse } from 'date-fns';

interface IWorkspace {
    [key:string]: any; // Add index signature
}
export interface IWorkspaceProps {
    id: string;
    WorkspaceId: string;
    Name: string;
    Description: string;
    QueryText: string;
    Created: string;
    IsActive: boolean;
    IsWellknown: boolean;
    ResultCount: number;
    Revision: number;
    [propName: string]: any;
}
export class Workspace extends Model {
    public id: string;
    public WorkspaceId: string;
    public Name: string;
    public Description: string;
    public QueryText: string;
    public Created: string;
    public IsActive: boolean;
    public IsWellknown: boolean;
    public ResultCount: number;
    public Revision: number;
    [propName: string]: any;

    public AccessKeys : Array<AccessKey>;

    constructor(props : IWorkspaceProps){
        super();
        this.id = props.id;
        this.WorkspaceId = props.WorkspaceId;
        this.Name = props.Name;
        this.Description = props.Description;
        this.QueryText = props.QueryText;
        this.Created = props.Created;
        this.IsActive = props.IsActive;
        this.IsWellknown = props.IsWellknown;
        this.ResultCount = props.ResultCount;
        this.Revision = props.Revision;
    }
}