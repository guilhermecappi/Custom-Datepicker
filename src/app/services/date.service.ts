import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  subject = new Subject;
  
  constructor() { }

  sendDate(date){
    this.subject.next(date);
  }
  recieveDate(){
   return this.subject.asObservable();
  }
}
