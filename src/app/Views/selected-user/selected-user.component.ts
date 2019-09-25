import { Component, OnInit } from '@angular/core';
import {JsonServiceService} from "../../Services/json-service.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.css']
})
export class SelectedUserComponent implements OnInit {

  userDetails = [];
  userId = [];
  constructor(private listService: JsonServiceService,
              private  route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(result => {
      result['params'].userId.forEach(userId => {
        this.listService.listImageAndDetails().subscribe(result => {
          result[1].forEach(user => {
            if(userId == user['id']){
              result[0].forEach(image => {
                if(image['id'] == userId){
                  user.avatar = image['avatar'];
                  this.userDetails.push(user);
                }
              });
            }
          });
        });
      });
    })
  }
  user: {};
  onSubmit(payLoad){
    payLoad.forEach(result => {
      this.userId.push(result.id);
    });
    this.router.navigate(['/user/'], {queryParams: {userId:this.userId}});
  }

}
