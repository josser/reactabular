/* eslint-disable no-shadow */
import React from 'react';
import { Search } from '../helpers';
import {
  Table, search
} from '../../src';

export default class FixedWidthColumnsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {}, // Search query
      columns: [
        {
          header: {
            label: 'Name'
          },
          cell: {
            property: 'name'
          }
        },
        {
          header: {
            label: 'Address'
          },
          cell: {
            property: 'address'
          }
        }
      ],
      data: [
        {
          id: 1,
          name: 'This is a very long title that goes on and on',
          address: '85 Peachfield Road'
        },
        {
          id: 2,
          name: 'Here is a shorter one',
          address: '77 Newmarket Road'
        }
      ]
    };
  }
  render() {
    const components = {
      header: {
        cell: FixedWidthHeader
      }
    };
    const { data, columns, query } = this.state;
    const searchedData = search.multipleColumns({ columns, query })(data);

    return (
      <div>
        <div className="search-container">
          <span>Search</span>
          <Search
            columns={columns}
            data={data}
            onChange={query => this.setState({ query })}
          />
        </div>
        <Table.Provider
          components={components}
          columns={columns}
          data={searchedData}
          rowKey="id"
        >
          <Table.Header />

          <Table.Body />
        </Table.Provider>
      </div>
    );
  }
}

class FixedWidthHeader extends React.Component {
  constructor(props) {
    super(props);

    this.widthSet = false;
    this.state = {
      style: {}
    };
  }
  componentDidUpdate() {
    if (this.widthSet) {
      return;
    }

    const width = this.refs.header.clientWidth;

    // Wait till width is available and set then
    if (width) {
      this.widthSet = true;

      this.setState({ // eslint-disable-line react/no-did-update-set-state
        style: { width }
      });
    }
  }
  render() {
    return (
      <th style={this.state.style} ref="header">{this.props.children}</th>
    );
  }
}
FixedWidthHeader.propTypes = {
  children: React.PropTypes.any
};
