import React, { Component, ReactNode } from 'react';
import './sass/main.scss';

interface IWorkspacesProps {
   children?: ReactNode;
}

export const Workspaces = (props: IWorkspacesProps) => (
   <div className="lk-worspaces bg-dark text-white">
      
         { props.children }

   </div>
);