import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(product){
    this.subject.next(product) // Trigerring an event
  }

  getMsg(){
    return this.subject.asObservable() //
  }

}
