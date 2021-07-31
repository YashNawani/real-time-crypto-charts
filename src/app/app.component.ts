import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ChartService } from './chart.service';
import { coin } from "src/app/Type/currency.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  constructor (private chartService: ChartService){}
  title = 'realtimechart';
  chart= [];

 



  ngOnInit(): void {

     


   

  
  }


  addData(chart, labels_builds,labels_data){
    chart.data.labels.push(labels_builds);
    chart.data.datasets.data.forEach(dataset => {
       dataset.data.push(labels_data);
    });
    chart.update();
}
  
  getvalues(): void {
    this.chartService.getCurrency() 
    .subscribe(res =>{
      let coin = res[0]
      let price = coin.current_price
      let currency = coin.id
      
        
       this.addData(this.chart, currency, price);
        })

    
    }
  
}
