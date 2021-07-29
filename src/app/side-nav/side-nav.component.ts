import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FunctionCallService } from '../function-call.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.css'],
  
})
export class SideNavComponent implements OnInit {

 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private functioncall:FunctionCallService) {}
  ngOnInit(){
    
  }

  getChart(i: number){
      this.functioncall.sendMessage(i)
  }
}
