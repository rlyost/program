import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newPet = {};
  char_error = "";
  message = "";

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService){
  }

  ngOnInit() {
  }

  onSubmit(){
    if(this.newPet['name'].length < 3){
      this.char_error = "A name must be at least 3 characters!";
      console.log(this.char_error);
    } else if(this.newPet['type'].length < 3) {
      this.char_error = "A type must be at least 3 characters!";
    } else if(this.newPet['desc'].length < 3) {
      this.char_error = "A description must be at least 3 characters!";
    } else {
      let observable = this._httpService.addPet(this.newPet);
      observable.subscribe(data => {
        console.log("Got our post back!", data);
      });
    };
    this.newPet = {name: "", type: "", desc:"", skill1:"", skill2:"", skill3:""};
    this.goHome();
  };
  goHome(){
    this._router.navigate(['/home']);
  }
}
