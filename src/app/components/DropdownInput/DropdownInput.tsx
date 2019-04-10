import * as React from 'react';
import {IFormField} from '@Components/FormField';

interface IOption {
   value : string;
   label? : string;
   selected? : boolean;
}

interface IDropdownInputProps extends IFormField {
   items : Array<IOption>
}

export const DropdownInput = (props: IDropdownInputProps) => (
   <div className={[props.className, "lk-dropdown", "form-group"].join(' ')}>
      { props.label? <label><small>{props.label}</small></label> : null }

      <select  
         className="w-100 form-control" 
         name={props.name} 
         value={props.value}
         onChange={(e) => props.onChange && props.onChange(e.target) }>
         {
            props.items.map((optionData : IOption, index: number) => {
               return <option key={index + optionData.label + optionData.value}  {...optionData}>{optionData.label}</option>
            })
         }
      </select>
   </div>
);