import '.././polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatSortModule,
    MatTooltipModule
  } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import * as d3 from 'd3';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent

],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatRippleModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: '', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
],
  providers: [],
  bootstrap: [AppComponent]
})

@NgModule({
  exports: [
    CdkTableModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatRippleModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class AppModule { }
