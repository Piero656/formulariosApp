import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserNameValidatorService implements AsyncValidator {

  constructor(
    private http : HttpClient,
  ) { }

  validate(control:AbstractControl) : Observable<ValidationErrors | null> {
    const userName = control.value;
    console.log(userName);
    return this.http.get<any[]>(`http://localhost:3000/usuarios?username=${userName}`)
            .pipe(
              delay(1000),
              map(resp => {
                return (resp.length === 0) ? null : { userNameTomado : true}
              })
            )
  }


}
