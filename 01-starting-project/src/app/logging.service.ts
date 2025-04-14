import { Injectable } from '@angular/core';

@Injectable({
  // since this service is provided to the 'root', we can easily use it in another service!
  providedIn: 'root'
})
export class LoggingService {
  // log method; expects to get a messsage
  log(message: string) {
    const timeStamp = new Date().toLocaleDateString();
    console.log(`[${timeStamp}]: ${message}`);
  };
}
