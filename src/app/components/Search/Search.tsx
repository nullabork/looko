import * as React from 'react';
import ISearchProps from './ISearch';

export class Search extends React.Component<ISearchProps, {}> {
   render() {
   return <h1>This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler}</h1>
   }
}