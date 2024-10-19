import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'https://uncovered-treasure-v1.p.rapidapi.com/';
  apiKey = 'g5EmMklvTxmshaeUxb08554AxZkep10CmVYjsn79N8yPZgem0B';

  constructor() { }

  async getApi(url: string) {
    const options = {
      url: this.apiUrl + url,
      headers: {
        'x-rapidapi-key': this.apiKey,
        'x-rapidapi-host': 'uncovered-treasure-v1.p.rapidapi.com'
      }
    };
    const response = await CapacitorHttp.request(options);

    return response;
  }

}
