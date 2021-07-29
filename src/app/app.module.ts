import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './side-nav/side-nav.component';



const routes: Routes = [
  {path: 'side-nav', component: SideNavComponent},
  {path: '**', component: SideNavComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MyBarChartComponent,
    SideNavComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
