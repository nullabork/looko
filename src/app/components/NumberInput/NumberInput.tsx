import * as React from 'react';
import {IFormField} from '@Components/FormField';
interface INumberInputProps extends IFormField {
   number? : number;
}


export const NumberInput = (props: INumberInputProps) => (
   <div className={[props.className, "lk-input", "form-group"].join(' ')}>
      <dl>
         <dt><label><small>{props.label}</small></label></dt>
         <dd>
            <input 
               className="w-100 form-control" 
               name={props.name} 
               type="number"
               value={props.number}
               onChange={(e) => props.onChange && props.onChange(e.target) } />
         </dd>
      </dl>
   </div>
);