import React, { Component, ReactNode } from 'react';
import { string } from 'prop-types';
import domain from 'getdomain';
import { IResult } from '@Models/ResultSet';
import { Icon } from '@Components/Icon';


export interface IResultProps {
   result: IResult;
   onSelect: {(result:IResult) : void};
   selectedWorkspace: boolean;
}

export const ResultRow = (props: IResultProps) => (
   // <div className="p-2">
   //    <div className="">{ props.result.Title }</div>
   //    <div className="">{ props.result.Description }</div>
   // </divIResult
   
   <div className={`border-bottom mt-2 pb-2 ${props.selectedWorkspace?'border-top border-primary bg-light':''}`} onClick={() => props.onSelect(props.result)}>
      <div className="">
         
         <div className="text-truncate text-primary">
            <a target="_blank" href={props.result.Uri}>{props.result.Title}</a>
            <br/>
            <small className="text-muted">
               {domain.get(props.result.Uri)}
            </small>
         </div>

         <div className="text-muted ">
            {props.result.Description}
         </div>
         
      </div>
   </div>     
);