import { memo } from 'react';
import {nanoid} from 'nanoid';
import { SortName } from '../../types/const/const';


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
  changeSort: SetFilterStatus;
}

function SortList ({sortName, changeSort}: SortListProps): JSX.Element {
  return (
    <>
      { Object.values(SortName).map((sort) =>
        (
          <li key={nanoid(3)} className={sort === sortName.sortType ?
            'places__option places__option--active' :
            'places__option'}
          tabIndex={0}
          onMouseDown={() => changeSort({
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
