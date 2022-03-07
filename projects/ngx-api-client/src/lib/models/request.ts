import { HttpHeaders } from '@angular/common/http';

export interface Request {
    queryParams?: any;
    headers?: HttpHeaders;
  }