import { Injectable } from '@angular/core';
import { CallNumber } from 'capacitor-call-number';
@Injectable({
  providedIn: 'root',
})
export class CallnumberService {
  constructor() {}

  showNumber(number: any) {
    CallNumber.call({ number, bypassAppChooser: true });
  }
}
