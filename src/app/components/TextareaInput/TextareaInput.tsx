import * as React from 'react';
import {IFormField} from '@Components/FormField';
interface ITextareaInputProps extends IFormField {

}


export const TextareaInput = (props: ITextareaInputProps) => (
   <div className={[props.className, "lk-input"].join(' ')}>
      <dl>
         <dt><label><small>{props.label}</small></label></dt>
         <dd>
            <textarea 
               className="w-100" 
               name={props.name}
               value={props.value}
               onChange={(e) => props.onChange(e.target) } >
            </textarea>
         </dd>
      </dl>
   </div>
);