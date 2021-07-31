
//Import Starements
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { BaseChartDirective, Color } from 'ng2-charts';
import { interval, timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { ChartService } from '../chart.service';
import { FunctionCallService } from '../function-call.service';
import * as moment from 'moment';


//Component properties
@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css'],
  template:'<app-side-nav [getChart]="getvalues"></app-side-nav>',
  changeDetection:ChangeDetectionStrategy.OnPush
})



export class MyBarChartComponent implements OnInit { 
  
  public maxY:number 
  
  private messageSubscription: Subscription;
  clickEventSubscription:Subscription; 
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
 
    constructor(private chartService : ChartService, private functioncall:FunctionCallService) {}
    
    //Chart Properties*************

    public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Price'
         }
      }]
   }//END scales
    };  

    public lineChartPlugins = [{
      beforeDraw(chart, easing) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const top = chartArea.top; 
  
        ctx.save();
        ctx.fillStyle = 'white';
  
        ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, chartArea.bottom - top);
        ctx.restore();
      }
    }];
    public lineChartLabels:string[] = [];
    public lineChartType = 'line';
    public lineChartLegend = true;  
    public lineChartData = [
      {data: Array<any>(), label: 'Series A'},
    ];  

    public lineChartColors: Color[]=  [
      { 
        // green
        backgroundColor:  'rgba(0, 255, 0, 0.3)',
        borderColor: 'green',
        pointBackgroundColor: 'rgba(30, 130, 76, 1)',
        pointBorderColor: 'rgba(30, 130, 76, 1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        
      },

    ];

//Chart Properties Ends*************



    public noOfCoins = 10
    public selectedCoin = 0
    public coins : Array<Array<{data: number, time: string, label: string}>>

  ngOnInit() {

    this.coins = new Array<any>()
    for(let k=0; k<this.noOfCoins; k++)
        {
          this.coins.push(new Array<any>())
        }

    const ob$ = interval(10000)
    ob$.subscribe((d)=>
    {

            console.log('Coins:', this.coins)

            this.messageSubscription = this.functioncall.currentMessage.subscribe(m =>{
                    this.getvalues(m)
                    console.log(m)
                    
                    let coindata = new Array<any>()
                    //let cointime: string[] = []
                    let k=0;
                    let loopsize = this.coins[m].length

                    console.log('loopsize' , loopsize)

                    for(k=0; k<loopsize; k++)
                        {
                          coindata.push(this.coins[m][k].data)
                          //cointime.push(this.coins[m][k].time)
                        }

                    this.lineChartData[0].data = coindata
                    this.lineChartLabels.push(this.coins[m][loopsize-1].time)
                    this.lineChartData[0].label=this.coins[m][0].label

                    console.log('Barchartdata: ',this.lineChartData[0])
                    console.log('BarchartTime: ',this.lineChartLabels)

                    if(this.lineChartLabels.length >= 20)
                        {
                          this.lineChartLabels.shift()
                        }

                    this.chart.chart.update()
              
            });
    })

  }

    addData(i,currency,time,price)
        {
          
          // this.barChartData[0].data.push(price)
          // this.barChartLabels.push(time) 
          // this.barChartData[0].label=currency
          // this.chart.chart.update()

          //convert timestamp string to time string hh:mm:ss
          let NewTime = moment.utc(time).utcOffset("+05:30").local().format('HH:mm:ss');
          console.log('New Time' , NewTime)

          this.coins[i].push({data: price, time: NewTime, label: currency})   
        }

 
    getvalues(i:number) 
        {
              this.chartService.getCurrency() 
              .subscribe(res =>{
                console.log('Res: ',res)
                // let coin = res[i]
                // let price = coin.price
                // let currency = coin.currency
                // let time = coin.price_timestamp
                let j=0
                res.forEach(e => {
                  this.addData(j++, e.id, e.price_timestamp, e.current_price)
                });

                //this.addData(i,currency,time, price);
                })
        }




}