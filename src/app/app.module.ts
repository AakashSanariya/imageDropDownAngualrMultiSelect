import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageListComponent } from './Views/image-list/image-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { SelectedUserComponent } from './Views/selected-user/selected-user.component';
import { SearchPipePipe } from './Services/search-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    SelectedUserComponent,
    SearchPipePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
