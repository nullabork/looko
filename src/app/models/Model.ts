import randomWords from 'random-words';
import EventEmitter from 'events';
import { parse } from 'date-fns';

console.log(randomWords);

export class Model {
    private DateCreated? : Date;
    public Created? : string;

    public static GenerateID() :string {
        return randomWords(5).join('-');
    }

    public static event = new EventEmitter();

    public getCreateDate() : Date {
        if(this.Created && !this.DateCreated){
            this.DateCreated = parse(this.Created);
        } else if(!this.Created && !this.DateCreated){
            return null;
        }

        return this.DateCreated;
    }
}
