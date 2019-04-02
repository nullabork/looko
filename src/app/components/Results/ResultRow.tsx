import React, { Component, ReactNode } from 'react';
import { string } from 'prop-types';
import domain from 'getdomain';
import { IResult } from '@Models/ResultSet';
import { Icon } from '@Components/Icon';
import './sass/_result.scss';

export interface IResultProps {
   result: IResult;
   onSelect: {(result:IResult) : void};
   selectedWorkspace: boolean;
}

export const ResultRow = (props: IResultProps) => (
   
   <div className={`lk-result-row border-bottom mt-2 pb-2 ${props.selectedWorkspace?'border-top border-primary bg-light':''}`} onClick={() => props.onSelect(props.result)}>
      <div className="">
         
         <div className="text-truncate text-primary lk-result-wrapper">
            <a target="_blank" href={props.result.Uri}>{props.result.Title}</a>
            <br/>
            <small className="text-muted">
               { domain.get(props.result.Uri) }
            </small>
         </div>

         <div className="text-muted lk-result-description">
            { props.result.Description }
         </div>
         
      </div>
   </div>     
);