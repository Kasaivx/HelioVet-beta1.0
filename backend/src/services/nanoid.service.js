import {nanoid} from "nanoid"

export function genNanoID(prefix){
const nanoID =`${prefix}-${nanoid(4)}`;

return nanoID;

}