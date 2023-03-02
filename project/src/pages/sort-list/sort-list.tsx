import { memo } from 'react';
import {nanoid} from 'nanoid';
import { SORT_NAME } from '../../types/const/const';

type SetOpenSort = (value: boolean) => void;

type SortListProps = {
  sortName: string;
  onSetOpenSort: SetOpenSort;
}

function SortList ({sortName, onSetOpenSort}: SortListProps): JSX.Element {
  return (
    <>
      { SORT_NAME.map((sort) =>
        (
          <li key={nanoid(3)} className={sort === sortName ?
            'places__option places__option--active' :
            'places__option'}
          tabIndex={0}
          onMouseDown={(openSort) => onSetOpenSort(!openSort)}
          >
            {sort}
          </li>
        ))}
    </>
  );
}

export default memo(SortList);
