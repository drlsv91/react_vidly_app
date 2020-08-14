import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  let index = (pageNumber - 1) * pageSize;
  return _(items).slice(index).take(pageSize).value();
}
