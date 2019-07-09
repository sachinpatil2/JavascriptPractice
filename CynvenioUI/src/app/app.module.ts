import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ZstackComponent } from './zstack/zstack.component';
import { DexpertComponent } from './dexpert/dexpert.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatSliderModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ConfigModule, ConfigService } from './services/ConfigService';
import { HttpClientModule } from '@angular/common/http';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ZstackComponent,
    DexpertComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxImageZoomModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    ChartsModule,
    MatSliderModule,
    MatProgressSpinnerModule

  ],
  providers: [
    ConfigService,
    ConfigModule.init()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }