import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getPetsFromService();
  }
  getPetsFromService(){
    let observable = this._httpService.getPets()
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.pets = data['data'];
      var sortedItems = this.pets.sort(this.dynamicSort('type'));
      console.log("SORTED:", sortedItems);
    });
  }
  onClickAdopt(id){
    let observable = this._httpService.adopt(id);
    observable.subscribe(data => {
      console.log("Got our delete back!", data);
      this.pets = [];
    });
    this.getPetsFromService();
  };
  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

}
