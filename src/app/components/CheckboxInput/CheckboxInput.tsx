import * as React from 'react';
import {IFormField} from '@Components/FormField';
interface ICheckboxInputProps extends IFormField {
   checked : boolean;
}


export const CheckboxInput = (props: ICheckboxInputProps) => (
   <div className={[props.className, "lk-input"].join(' ')}>
      <dl>
         <dt> 
            <label className="" htmlFor={props.id}>
               <small>{props.label}</small>
            </label>
         </dt>
         <dd>

            <div className="custom-control custom-switch">
               <input 
                  type="checkbox"
                  name={props.name}
                  className="custom-control-input" 
                  id={props.id}  
                  onChange={(e) => props.onChange(e.target) }
                  checked={props.checked ? true : false}
                  />
               <label className="custom-control-label" htmlFor={props.id}></label>
            </div>

 
         </dd>
      </dl>
   </div>            
);