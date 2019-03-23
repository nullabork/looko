import * as React from 'react';


interface IIconProps {
   name : string;
}


export const Icon = (props: IIconProps) => (
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
);