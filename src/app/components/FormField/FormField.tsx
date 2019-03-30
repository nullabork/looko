import * as React from 'react';

export interface IFormField {
   name : string;
   id : string;
   className? : string;
   value? : string;
   label : string;
   onChange? : { (target:HTMLElement) : void  };
   onClick? : { () : void  };
}


export const FormField = (props: IFormField) => (
   <span className={[props.className, "lk-input"].join(' ')}>
   </span>
);