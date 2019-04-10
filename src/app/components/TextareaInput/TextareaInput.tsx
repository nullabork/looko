import * as React from 'react';
import {IFormField} from '@Components/FormField';

interface ITextareaInputProps extends IFormField {

}


export const TextareaInput = (props: ITextareaInputProps) => (
   <div className={ ( props.classNames || [props.className, "lk-input", "form-group"]).join(' ') }>
      { props.label ? <label><small>{props.label}</small></label> : null }
      <textarea 
         className="w-100 form-control" 
         name={props.name}
         value={props.value}
         onChange={(e) => props.onChange && props.onChange(e.target) } >
      </textarea>
   </div>
);