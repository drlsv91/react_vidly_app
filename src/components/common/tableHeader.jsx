import React, { Component } from 'react';

// onSort=method
// sortedColumn={}
// columns =array
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortedColumn = { ...this.props.sortedColumn };
    if (sortedColumn.path === path) {
      sortedColumn.orderBy = sortedColumn.orderBy === 'asc' ? 'desc' : 'asc';
    } else {
      sortedColumn.orderBy = 'asc';
      sortedColumn.path = path;
    }
    this.props.onSort(sortedColumn);
  };
  renderSortIcon = (column) => {
    const { sortedColumn } = this.props;

    if (column.path !== sortedColumn.path || !column.path) return null;
    if (sortedColumn.orderBy === 'asc')
      return <i className='fa fa-sort-asc'></i>;

    return <i className='fa fa-sort-desc'></i>;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className='clickable'
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
