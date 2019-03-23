import React, { Component, ReactNode } from 'react';
import { AccessKey } from '@Models/AccessKey';


interface IResultsProps {
   children?: ReactNode;
}

export const Results = (props: IResultsProps) => (
   <div className="">
      { props.children }
   </div>
);