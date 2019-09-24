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
  searchText;

  constructor(private listService: JsonServiceService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(param => {
      if(param['params']['userId'] != null){
        param['params']['userId'].forEach(result => {
          if(result != null) {
            this.selectUser.push(result);
          }
          else{
            this.selectUser = null;
          }
        });
      }
    }, error => {
      console.log(error);
    });
    this.listService.listImageAndDetails().subscribe(result => {
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
  }

  onSubmit(payLoad){
    this.router.navigate(['/selecteduser/'], {queryParams: payLoad});
  }

  onReset(){
    this.selectUser = null;
    this.router.navigate(['user']);
  }
}
