import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }
  getPets() {
    return this._http.get('/pets');
  }
  getPetById(id) {
    let route_call = "/pet/" + id;
    return this._http.get(route_call);
  }
  updateLike(id, up) {
    let like = [id, up];
    console.log(like);
    return this._http.put('/like/update', like);
  }
  addPet(pet) {
    return this._http.post('/pet/new', pet);
  };
  updatePet(editPet) {
    return this._http.put('/pet/update', editPet);
  };
  adopt(id) {
    var route_call = "/pet/remove/" + id;
    return this._http.delete(route_call);
  }

}
