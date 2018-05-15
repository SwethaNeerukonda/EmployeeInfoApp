
// modules
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ChartModule} from 'angular-highcharts';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatToolbarModule, MatButtonModule, MatTooltipModule } from '@angular/material';

// components
import { AppComponent } from './app.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import {EmployeeInfoService} from './employee-info/employee-info.service';
import {appRoutes} from './routerConfig';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeInfoComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, RouterModule, FormsModule, HttpClientModule, ChartModule,
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,MatButtonModule, MatTooltipModule,
    MatSortModule, MatTableModule, MatToolbarModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
