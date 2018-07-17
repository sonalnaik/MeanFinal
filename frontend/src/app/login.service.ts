import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class LoginService {
 model:any ={};
  constructor(private http: HttpClient) { }

  //https://github.com/gangachris/ng2-mean/blob/master/server/routes/api.js

  handleLogin(username, password) {
    return this.http.post('http://localhost:8081/api/login',
      {
        username: username,
        password: password
      })

  }

  saveCompany(company, contact, country) {
    return this.http.post('http://localhost:8081/api/save_company',
      {
        company: company,
        contact: contact,
        country: country
      }
    )
  }
  allCompany(): Observable<any> {
    return this.http.post('http://localhost:8081/api/allCompany',
      {
        all: 'all'
      });
  }

  fetchSingleCompany(id): Observable<any> {
    
     
    return this.http.post('http://localhost:8081/api/fetchSingleCompany',
      {
        id: id
      }
    )
  }

  updateCompany(id,company,contact,country){
    return this.http.post('http://localhost:8081/api/updateCompany',{
      id:id,
      company:company,
      contact:contact,
      country:country

    })
  }
  deleteCompany(id):Observable<any> {
    return this.http.post('http://localhost:8081/api/deleteCompany',{
      id:id
    })
  }

}
