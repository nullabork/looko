import * as React from 'react';
import {IFormField} from '@Components/FormField';
interface ITextInputProps extends IFormField {

}


export const TextInput = (props: IFormField) => (
   <div className={[props.className, "lk-input", "form-group"].join(' ')}>
      <dl>
         <dt><label><small>{props.label}</small></label></dt>
         <dd>
            <input 
               className="w-100 form-control" 
               name={props.name} 
               type="text"
               value={props.value}
               onChange={(e) => props.onChange && props.onChange(e.target) } />
         </dd>
      </dl>
   </div>
);