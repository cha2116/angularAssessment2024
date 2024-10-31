import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { ViewComponent } from './Contact_Information/view/view.component';
import { ErrorComponent } from './Contact_Information/error/error.component';
import { AddComponent } from './Contact_Information/add/add.component';
import { HomeComponent } from './Contact_Information/home/home.component';
import { ListComponent } from './Contact_Information/list/list.component';
import { NavBarComponent } from './Contact_Information/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddEditModalComponent } from './Contact_Information/add-edit-modal/add-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    ErrorComponent,
    AddComponent,
    HomeComponent,
    ListComponent,
    NavBarComponent,
    AddEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    MatIconModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
