import { HttpParams } from '@angular/common/http';

export class QueryStringBuilder {
  static buildQueryParameters<T>(obj: T): HttpParams {
    let params: HttpParams = new HttpParams();

    if (obj == null) {
      return params;
    }

    return QueryStringBuilder.populateSearchParams(params, '', obj);
  }

  private static populateObject<T>(
    params: HttpParams,
    prefix: string,
    val: T
  ): HttpParams {
    const objectKeys = Object.keys(val) as Array<keyof T>;

    for (let objKey of objectKeys) {
      let value = val[objKey];
      let key = prefix;
      if (prefix) {
        key += '.' + objKey;
      } else {
        key += objKey;
      }

      params = QueryStringBuilder.populateSearchParams(params, key, value);
    }
    return params;
  }

  private static populateArray<T>(
    params: HttpParams,
    prefix: string,
    val: Array<T>
  ): HttpParams {
    for (let index in val) {
      let key = prefix + '[' + index + ']';
      let value: any = val[index];
      params = QueryStringBuilder.populateSearchParams(params, key, value);
    }
    return params;
  }

  private static populateSearchParams<T>(
    params: HttpParams,
    key: string,
    value: any
  ): HttpParams {
    if (value instanceof Array) {
      return QueryStringBuilder.populateArray(params, key, value);
    } else if (value instanceof Date) {
      return params.append(key, value.toISOString());
    } else if (value instanceof Object) {
      return QueryStringBuilder.populateObject(params, key, value);
    } else if ('undefined' !== typeof value && null !== value) {
      return params.append(key, value.toString());
    }
    return params;
  }
}
