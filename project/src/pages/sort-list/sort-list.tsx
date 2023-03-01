import { memo } from 'react';
import {nanoid} from 'nanoid';
import { nameSort } from '../../types/const/const';

type CloseHandler = (value: boolean) => void;

type indicatorNameSort = {
  valueSort: string;
  closeHandler: CloseHandler;
}

function SortList ({valueSort, closeHandler}: indicatorNameSort): JSX.Element {
  return (
    <>
      { nameSort.map((valueName) =>
        (
          <li key={nanoid(3)} className={valueName === valueSort ?
            'places__option places__option--active' :
            'places__option'}
          tabIndex={0}
          onMouseDown={(openSort) => closeHandler(!openSort)}
          >
            {valueName}
          </li>
        ))}
    </>
  );
}

export default memo(SortList);
