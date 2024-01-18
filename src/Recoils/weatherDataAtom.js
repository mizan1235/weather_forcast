import {atom} from "recoil"
const weatherDataAtom = atom({
    key: 'weatherDataAtom', 
    default: {clouds:{}, city:[],list: [{main:[],wind:[]}] }, // default value (aka initial value)
  });
export default weatherDataAtom