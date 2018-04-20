import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  pet = [];
  id = "";
  x = 0;
  isPushed: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {
  }

  ngOnInit() {
    this.unPushMe();
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.getPet(this.id);
  }

  getPet(id): void {
    console.log("getPet:", id);
    let observable = this._httpService.getPetById(id);
    observable.subscribe(data => {
      console.log("Got our task!", data);
      if (data['message'] == "Error") {
        this._router.navigate(['/pagenotfound']);
      };
      this.pet = data['data'];
      this.x = this.pet['like'];

    });
  };

  likePet(id) {
    this.pushMe();
    this.x++;
    console.log(this.x, id);
    let observable = this._httpService.updateLike(id, this.x);
    observable.subscribe(data => {
      console.log("Got our data!", data);
      console.log(data['message']);
    });
  };

  adoptPet(id) {
    let observable = this._httpService.adopt(id);
    observable.subscribe(data => {
      console.log("Got our data!", data);
    });
    this._router.navigate(['/home']);
  }
  pushMe() {
    this.isPushed = true;
  };
  unPushMe() {
    this.isPushed = false;
  };
}
