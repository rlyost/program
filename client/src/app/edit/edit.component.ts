import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet = [];
  id ={};
  char_error = "";

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService){
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this.fillEditBox(this.id);
  }
  
  fillEditBox(id): void { 
    console.log("fillEditBox:", id);
    let observable = this._httpService.getPetById(id);
    observable.subscribe(data => {
      console.log("Got our task!", data);
      if(data['message'] == "Error"){
        this._router.navigate(['/pagenotfound']);
      };
      this.pet = data['data'];
    });
  };

  onClickUpdate(){
    if(this.pet['name'] == null || this.pet['name'].length < 3){
      this.char_error = "A name must be at least 3 characters!";
      console.log(this.char_error);
    } else if(this.pet['type'] == null || this.pet['type'].length < 3) {
      this.char_error = "A type must be at least 3 characters!";
    } else if(this.pet['desc'] == null || this.pet['desc'].length < 3) {
      this.char_error = "A description must be at least 3 characters!";
    } else {
      let observable = this._httpService.updatePet(this.pet);
      observable.subscribe(data => {
        console.log("Got our post back!", data);
        if(data['message'] == "Error") {
          this.char_error = data['error'].message;
        } else {
          this.id = this.pet['_id'];
          this.pet = [];
          this._router.navigate(['/details', this.id]);
        }
      });
    }
  };

}
