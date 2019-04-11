import * as React from 'react';


interface ITagsProps {
   items : Array<string>;
}

interface IColor {
   color : string;
   invert : string;
}

function colors (str:string): IColor {

   var hash = 0,
     color = "#",
     invert = "#FFFFFF",
     colors = [];
 
   for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
 
   for (var i = 0; i < 3; i++) {
     var value = (hash >> (i * 8)) & 0xFF;
     color += ('00' + value.toString(16)).substr(-2);
     colors.push(value);
   }
 
   if( (colors[0] * 0.299 + colors[1] * 0.587 + colors[2] * 0.114) > 186) {
     invert = "#000000";
   }
 
   return {
     invert,
     color
   }
 }



export const Tags = (props: ITagsProps) => {
   var items = props.items || [];
   return (
     <div>
        {
         items.map((item) => {
            let color = colors(item);
            let style = {
               background: color.color,
               color: color.invert
            };
            return <a href="#" style={style} className="badge">{item}</a>
         })
        }
     </div>
   )
}