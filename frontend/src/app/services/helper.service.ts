import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  setHeaders(){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem("token"))
    }
    return header;
  }
  
}
