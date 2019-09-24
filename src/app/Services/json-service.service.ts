import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private router: Router,
              private http: HttpClient
  ) { }

  imageUrl = "../assets/user-avatar.json";
  userList = "../assets/user-list.json";
  userDetails;

  listImageAndDetails(){
    
    let Image = this.http.get<any>(this.imageUrl);
    let User = this.http.get<any>(this.userList);

    return forkJoin<any>([Image, User]);
  }
}
