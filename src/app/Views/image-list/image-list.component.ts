import {Component, OnInit} from '@angular/core';
import {JsonServiceService} from "../../Services/json-service.service";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  image: string;
  userDetails: {};
  selectUser = [];
  checkUserArray = [];
  selectUserObj = {};
  searchText;

  constructor(private jsonService: JsonServiceService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      if(param['params']['userId'] != null){
        param['params']['userId'].forEach(result => {
          if(result != null) {
            this.selectUser.push(result);
            this.checkUserArray.push(result);
          }
          else{
            this.selectUser = null;
          }
        });
      }
    }, error => {
      console.log(error);
    });
    this.jsonService.listImageAndDetails().subscribe(result => {
        result[1].forEach(user => {
          result[0].forEach(image => {
            if (image['id'] === user['id']) {
              user.avatar = image['avatar'];
            }
          });
        });
      this.userDetails = result[1];
    }, error => {
      console.log(error);
    });
    console.log(this.selectUser)
  }

  onSelect(event){
    if(this.checkUserArray.indexOf(event.target.value) > -1){
    }
    else{
      this.checkUserArray.push(event.target.value); //for checkbox than used
    }
  }

  onSubmit(){
    this.selectUserObj['userId'] = this.checkUserArray;  //for Using Check box Pass variable in Query Param
    this.router.navigate(['/selecteduser/'], {queryParams: this.selectUserObj});
  }

  onReset(){
    this.selectUser = null;
    this.checkUserArray = [];
    this.router.navigate(['user']);
  }
}
