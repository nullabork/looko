import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';
import './sass/_results.scss';

interface IResultsProps {
   children?: ReactNode;
}

export const Results = (props: IResultsProps) => (
   <div className='overflow-auto p-2 lk-results-rows'>
      <div className="">
         { props.children }
      </div>
   </div>
);