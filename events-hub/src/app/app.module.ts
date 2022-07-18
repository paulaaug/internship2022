import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EventsListComponent } from './events-list/events-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
