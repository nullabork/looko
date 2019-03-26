import React, { Component, ReactNode } from 'react';
import {IResult} from '@Models/ResultSet';

interface IResultDetailsProps {
   result: IResult;
}
      {/* DataHash: string;
   UriHash: string;
   URI: string;
   RefererUri: string;
   Uri: string;
   Title: string;
   Description: string;
   Tags: any,
   Created: string;
   PageSize: string;
   Sequence: number; */}


export const ResultDetails = (props: IResultDetailsProps) => (


   <div className=''>
      <h2>
      Details
      </h2>
      { props.result && 
      <div className='detaiols'>

         {
            ["DataHash",
            "UriHash",
            "RefererUri",
            "Uri",
            "Title",
            "Description",
            "Tags",
            "Created",
            "PageSize",
            "Sequence"].map((key:string) => {
               return <div key={key + props.result.UriHash } className="border-bottom p-0">
                  <dl>
                     <dt><small>{key} : </small></dt>
                     <dd><small>{ props.result[key] }</small></dd>
                  </dl>
               </div>
            })
         }
         
      </div>
      }
   </div>
);

