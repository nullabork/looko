import randomWords from 'random-words';
import EventEmitter from 'events';

console.log(randomWords);

export class Model {
    public static GenerateID() :string {
        return randomWords(5).join('-');
    }

    public static event = new EventEmitter();
}
