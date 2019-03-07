import * as randomWords from 'random-words';

export class Model {
    public static GenerateID() :string {
        return randomWords(5).join('-');
    }
}
