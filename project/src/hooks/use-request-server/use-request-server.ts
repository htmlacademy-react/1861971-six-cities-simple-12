import { useEffect } from 'react';
import { useAppDispatch } from '../use-store/use-store';

export function useRequestServer <A,B> (fetch: A, payload?: B) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!fetch) {
      return;
    }

    let isMounted = true;

    if(isMounted){
      dispatch(fetch(payload && payload));
    }

    return () => {
      isMounted = false;
    };
  },[fetch,dispatch,payload]);

}
