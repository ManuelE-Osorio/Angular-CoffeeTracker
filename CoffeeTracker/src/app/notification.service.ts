import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  messages: string[] = [];


  add(message: string) {
    this.messages.push(message);
    timer(3000).subscribe(n => {
      this.remove();
    });
  }

  remove() {
    this.messages.shift()
  }
  

  clear() {
    this.messages = [];
  }
}
