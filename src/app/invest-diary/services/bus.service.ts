import { Injectable, Signal } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private httpService: HttpService) { }

 
}
