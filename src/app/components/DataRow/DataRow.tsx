import * as React from 'react';
import {IFormField} from '@Components/FormField';
interface IDataRowProps {
   label : string;
   data : any;
   className? : any;
}


export const DataRow = (props: IDataRowProps) => (
   <div className={[props.className, "lk-dataRow"].join(' ')}>
      <dl>
         <dt> 
            {props.label}
         </dt>
         <dd>
            {props.data}
         </dd>
      </dl>
   </div>            
);