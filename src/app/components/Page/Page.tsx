import React, { Component, ReactNode } from 'react';

interface IPageProps {
   children?: ReactNode;
}

export const Page = (props: IPageProps) => (
   <div className="">
      <div className="d-flex flex-row">
         { props.children }
      </div>
   </div>
);