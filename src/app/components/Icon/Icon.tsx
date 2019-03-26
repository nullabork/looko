import * as React from 'react';


interface IIconProps {
   name : string;
   className? : string;
   onClick? : { () : void  };
}


export const Icon = (props: IIconProps) => (
   <span className={[props.className, "lk-icon"].join(' ')} onClick={ () => {
      console.log('whatup');
      props.onClick && props.onClick()
   }}>
      <svg
         width="24"
         height="24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         
         <use xlinkHref={`/icons/feather-sprite.svg#${props.name}`} />

      </svg>
   </span>
);