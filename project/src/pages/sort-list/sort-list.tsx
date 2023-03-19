import { memo } from 'react';
import {nanoid} from 'nanoid';
import { SORT_NAME } from '../../types/const/const';


type filterType = {
  cityName: string;
  sortType: string;
}

type SetFilterStatus = React.Dispatch<React.SetStateAction<{
  cityName: string;
  sortType: string;
}>>

type SortListProps = {
  sortName: filterType;
  onChangeNameSort: SetFilterStatus;
}

function SortList ({sortName, onChangeNameSort}: SortListProps): JSX.Element {
  return (
    <>
      { SORT_NAME.map((sort) =>
        (
          <li key={nanoid(3)} className={sort === sortName.sortType ?
            'places__option places__option--active' :
            'places__option'}
          tabIndex={0}
          onMouseDown={() => onChangeNameSort({
            ...sortName,
            sortType: sort
          })}
          >
            {sort}
          </li>
        ))}
    </>
  );
}

export default memo(SortList);
