import { memo } from 'react';
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
  onChangeSort: SetFilterStatus;
}

function SortList ({sortName, onChangeSort}: SortListProps): JSX.Element {
  return (
    <>
      { Object.values(SortName).map((sort) =>
        (
          <li key={sort} className={sort === sortName.sortType ?
            'places__option places__option--active' :
            'places__option'}
          tabIndex={0}
          onMouseDown={() => onChangeSort({
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
