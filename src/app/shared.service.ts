import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  data: any;

  saveForm(data?: any) {
    if (data) {
      this.data = data;
    }
    return this.data;
  }
}
