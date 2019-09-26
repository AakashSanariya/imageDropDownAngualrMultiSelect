import { Component, OnInit } from '@angular/core';
import {JsonServiceService} from "../../Services/json-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {userError} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.css']
})
export class SelectedUserComponent implements OnInit {

  userDetails = [];
  userId = [];
  selectedUserObj = {};
  checkUserArray = [];
  constructor(private jsonService: JsonServiceService,
              private  route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(result => {
      result['params'].userId.forEach(userId => {
        this.jsonService.listImageAndDetails().subscribe(result => {
          result[1].forEach(user => {
            if(userId == user['id']){
              result[0].forEach(image => {
                if(image['id'] == userId){
                  user.avatar = image['avatar'];
                  this.userDetails.push(user);
                  this.checkUserArray.push(user.id);
                }
              });
            }
          });
        });
      });
    })
  }

  onSelectRemove(event, userId){
    let key = this.checkUserArray.findIndex(k => k == event.target.value);
    // console.log(key);
    if(key > -1){
      this.checkUserArray.splice(key, 1);
    }
    if(key == -1){
      this.checkUserArray.push(userId);
    }
  }

  onSubmit(payLoad){
    this.router.navigate(['/user/'], {queryParams: {userId:this.checkUserArray}});
  }

}
