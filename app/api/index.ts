import {Observable, Subject} from 'rxjs';
import {take} from 'rxjs/operators';

import {httpGet, httpDelete, httpPost, httpPut} from './observable-converter';

export const useObservable = () => {
  const subj = new Subject<boolean>();

  const next = (value: boolean): void => {
    subj.next(value);
  };

  return {change: subj.asObservable(), next};
};

const {next} = useObservable();

export const get = <T>(url: string): Observable<T> => {
  return httpGet<T>(url).pipe() as Observable<T>;
};

export const post = <T>(url: string, item: any): Observable<T> => {
  return httpPost<T>(url, item).pipe() as Observable<T>;
};

export const deleteById = (url: string, id: string): Observable<void> => {
  return httpDelete<void>(url, id).pipe() as Observable<void>;
};

export const update = (url: string, item: any): Observable<void> => {
  return httpPut<void>(url, item).pipe(take(1)) as Observable<void>;
};
