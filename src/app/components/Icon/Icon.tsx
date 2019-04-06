import * as React from 'react';


interface IIconProps {
   name : string;
   sprite? : string;
   className? : string;
   width? : string;
   height? : string;
   onClick? : { () : void  };
}


export const Icon = (props: IIconProps) => {
   let sprites = props.sprite? props.sprite : "feather-sprite";
   return (
      <span className={[props.className, "lk-icon"].join(' ')} onClick={ () => {
         props.onClick && props.onClick()
      }}>
         <svg
            width={ props.width || "24" }
            height={ props.height || "24" }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <use xlinkHref={`/icons/${sprites}.svg#${props.name}`} />

         </svg>
      </span>
   )
}