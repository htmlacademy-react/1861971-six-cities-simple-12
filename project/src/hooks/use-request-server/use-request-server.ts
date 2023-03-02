import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppDispatch } from '../use-store/use-store';
import { Offers } from '../../types/const/const';


export function useRequestServer (fetch: AsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted){
      dispatch(fetch());
    }

    return () => {
      isMounted = false;
    };
  },[fetch,dispatch]);

}
