import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RegistrationnService {
  url = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient ) { }

  register(userdata) {

    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'Application/json'})
    };
    return this.http.post<any>(this.url, userdata, httpOptions);
  }
}
