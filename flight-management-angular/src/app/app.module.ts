import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightFormComponent } from './flight-form/flight-form.component';
import {
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { LandingTimeValidatorDirective } from './landing-time-validator.directive';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    FlightSearchComponent,
    FlightFormComponent,
    DialogComponent,
    LandingTimeValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [FlightListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
