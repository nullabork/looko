import React, { Component, ReactNode } from 'react';
interface IWorkspacesProps {
   children?: ReactNode;
}

export const Workspaces = (props: IWorkspacesProps) => (
   <div className="bg-dark text-white">
      
         { props.children }

   </div>
);