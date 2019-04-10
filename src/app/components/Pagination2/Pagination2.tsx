import { Icon, NumberInput } from '@Components/index';
import { AccountContextConsumer, AccountContextInterface } from '@Context/AccountContext';
import { AccessKey } from '@Models/AccessKey';
import * as React from 'react';
import './sass/_pagination.scss';
import { ResultSet } from '@Models/ResultSet';


interface IPagination2Props {
  resultSet: ResultSet;
  resultCount: number;
  update: {() : void};
}

export class Pagination2 extends React.Component<IPagination2Props, {}> {

  state: {
    menu: boolean;
  }

  constructor(props?: IPagination2Props) {
    super(props);
    this.state = {
      menu: false
    }
  }

  maxOut(): void {
    this.props.resultSet.max().fetch(() => {
      this.props.update();
    });
  }

  plusOne(): void {
    this.props.resultSet.next().fetch(() => {
      this.props.update();
    });
  }

  minusOne(): void {
    this.props.resultSet.prev().fetch(() => {
      this.props.update();
    });
  }

  zeroOut(): void {
    this.props.resultSet.zero().fetch(() => {
      this.props.update();
    });
  }

  paginationMenu(): void {
    this.setState({
      menu: !this.state.menu
    });
  }

  changeCount(value: number): void {
    this.props.resultSet.setPagerCount(value);
    this.props.resultSet.fetch(() => {
      this.props.update();
    });
  }


  render() {
    let pager = this.props.resultSet.pager;
    let total = this.props.resultCount;
    return (
      <div className='lk-pagination'>
        <div className={['lk-pagination-menu', this.state.menu ? 'lk-pagination-menu--active' : null].join(' ')} >

          <NumberInput
            name="pager_count"
            label="Results per page"
            id={'changecount'}
            number={this.props.resultSet.defaultPager.count}
            onChange={(target: HTMLInputElement) => {
              this.changeCount(+target.value);
            }} />


        </div>
        <div className='lk-pagination-bar'>
          <Icon name='chevrons-left' className='lk-icon-circle lk-pagination-item' onClick={() => this.zeroOut()} />
          <Icon name='chevron-left' className='lk-icon-circle lk-pagination-item' onClick={() => this.minusOne()} />
          <div className='lk-pagination-item lk-pagination-item--fill'>

            {pager.offset} - {pager.offset + pager.count}/{total}

          </div>
          <Icon name='menu' className='lk-icon-circle lk-pagination-item' onClick={() => this.paginationMenu()} />
          <Icon name='chevron-right' className='lk-icon-circle lk-pagination-item' onClick={() => this.plusOne()} />
          <Icon name='chevrons-right' className='lk-icon-circle lk-pagination-item' onClick={() => this.maxOut()} />
        </div>
      </div>
    )
  }
}
