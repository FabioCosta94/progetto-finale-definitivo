import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { getLocaleDateFormat } from '@angular/common';
import { filter } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import {ElementRef, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { title, config } from 'process';
import { saveAs } from 'file-saver';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { LoginService } from '../../services/login.service';
 
@Component({
  selector: 'app-filter-by-country',
  templateUrl: './filter-by-country.component.html',
  styleUrls: ['./filter-by-country.component.css']
})

export class FilterByCountryComponent implements OnInit {

  constructor(private dataService:DataService,public login: LoginService) { }

  //variabile in cui si memorizzano i dati nell'asse Y
  asseY : number[];
  //variabile in sui si memorizzano delle date sottoforma di stringhe
  dates : String[]; 

  //variabile in sui si memorizzano delle date sottoforma di numeri
  datesNumbers : number[] = [];

  chart : Chart;

  //Array utilizzato per creare il grafico la prima volta
  arrayAppoggio : number[] = [0, 10, 20, 30]

  myControl = new FormControl(); //per far funzionare il filtro
  countries : string[] = new Array(); // per il filtro dinamico
  filteredOptions: Observable<string[]>; //per il filtro
  public covidData : CovidData []; //appoggio per il collegamento al database
 
 
  public country:string; //per memorizzare la stringa dell’input
  
  //Base per costruire il sistema di filtraggio per categoria
  sortingOptions = ["cases", "population", "recoveries", "deaths"];

  public sortOption:string; //variabile per la scelta
  
  //Questo metodo salva la scelta di categoria dell'utente nella variabile sortOption
  // sortBy(form : NgForm){
  //   this.sortOption = form.form.value;
  // }

  
  //tentativi patetici di far funzionare il grafico aspettando il caricamento dei dati
  // a = waits(2000);
  // setTimeout(() => {
  //   console.log('aaa');
  // }, 2000)
  // await()
  //delay()

  //Questo è una sorta di puntatore all'elemento html, ma alla fine non lo sto usando
  //@ViewChild('chartwrapper') chartWrapper:ElementRef;
  

   createGraph() {
    let prova: any = document.getElementById('chartwrapper');
     //var canvas : any = document.getElementById("mycanvas");
    let ctx = prova.getContext("2d");
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020/07/06','2020/07/07'],
        datasets: [{
          lineTension: 0,
            label: '',
            borderColor: 'rgba(20, 20, 204, 0.90)',
            pointBorderColor: 'rgba(27, 81, 120, 1)',
            data: [10, 40],
            backgroundColor: [
              'rgba(20, 20, 204, 0)'
              // 'rgba(255, 99, 132, 0)',
              // 'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
          }]
        },
        options: {
          legend: {
            display: false
          },
        responsive: true,
        showLines: true,
        spanGaps: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: true,
                
               callback: function(value, index, values) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }

                
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Country timeline Chart'
        }
      }
       

    })
    // for (let i = 0; i < this.morti.length; i++) {
    //   this.morti.pop();
    //   this.datesNumbers.pop();
    // }

   };

   addData(chart, label, data) {
    chart.data.labels.push(label);
    //chart.data.data.push(data);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    //console.log('provalabel', label)
    //console.log('provadata', data)
    chart.update();
  }

//   creaPulsante() {
//     {  
//       var button = document.createElement('button');  
//       button.innerText = "Add";  
//       button.onclick = function()  
//       {console.log("Successo");  }
//       return button;
// }
// }
  

  
  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//Funzione per fare in modo che aspetti che l'array venga popolato prima di caricare
 resolveAfter2Seconds() {
   return new Promise(resolve => {
     setTimeout(() => {
       resolve('resolved');
     }, 2000);
   });
 }

 flaggrafico = true;
 flagNum = 0;


   async updGraph(form: NgForm) {

    this.flagNum = this.flagNum+1
    if (this.flagNum > 1) {
      this.flaggrafico=false;
    }
  

    //Memorizzo l'input categoria dell'utente
    this.sortOption = form.form.value.sort;
    //console.log(form.form.value.sort);

    //Memorizzo l'input nazione dell'utente
    let filtroCountry = this.dataService.getData().pipe(
      map( covidData => covidData.filter(element => element.country  == this.country)));


      let filtroOsservNum;
      
      
  
      //trasformo da elementi di tipo covidData ad elementi di tipo covidData.deaths (o covidData.quellochevuoi)
      //in base a ciò che l'utente ha scelto
      switch (this.sortOption) {
        case 'cases': {
          filtroOsservNum = filtroCountry.pipe(
            (map (dataSet => dataSet.map(covidData => covidData.cases))));
            //console.log(filtroOsservNum);
          break;
        }
        case 'population': {
          filtroOsservNum = filtroCountry.pipe(
            (map (dataSet => dataSet.map(covidData => covidData.population))));
            //console.log(filtroOsservNum)
          break;
        }
        case 'recoveries': {
          filtroOsservNum = filtroCountry.pipe(
            (map (dataSet => dataSet.map(covidData => covidData.recoveries))));
            //console.log(filtroOsservNum)
          break;
        }
        case 'deaths': {
          filtroOsservNum = filtroCountry.pipe(
            (map (dataSet => dataSet.map(covidData => covidData.deaths))));
            //console.log(filtroOsservNum)
          break;
        }
        default: {
          console.log('ERRORE')
          break;
        }
      
      }
  
    //Assegno i valori di covidData.categoria presi dal db alla variabile 'asseY'
    //filtroPerGrafico = this.filtroPerOsservabileNumeri.subscribe ((morti) => this.morti = morti);
    let filtroPerGraficoAsseY = filtroOsservNum.subscribe(valore => {
      this.asseY = valore;
      //console.log(this.asseY);
      // this.updGraph();
  });
  
  //trasformo da elementi di tipo covidData ad elementi di tipo covidData.date
    let filtroOsservDate = filtroCountry.pipe(
    (map ((dataSet) => dataSet.map((covidData) => covidData.date))));
  
    
  //Assegno i valori di covidData.dates presi dal db alla variabile 'date', convertite in stringhe
    let filtroPerGraficoDate = filtroOsservDate.subscribe(dates => {
      //console.log(dates);
      
      this.dates = dates.map((date) => date.toString());

    });
    let filtroProva = new Array()
    console.log('????????', this.dates)
    console.log('!!!!!!!!!!', filtroProva)

    for (let i = 0; i < this.dates.length; i++) {
      filtroProva.push(this.dates[i].substr(0, 10));
      console.log(filtroProva[i]);
    }
    console.log(filtroProva);

    //svuoto il vettore dei dati che aveva già
    for (let i = 0; i < this.asseY.length; i++) {
      this.removeData(this.chart);
    }

//Chiamata della funzione per far caricare l'array
await this.resolveAfter2Seconds();

     //riempo il vettore con i nuovi dati
    for (let i = 0; i < this.asseY.length; i++) {
      this.addData(this.chart, filtroProva[i], this.asseY[i])
      //console.log('provaprova', this.dates);
    }
   

    this.flaggrafico=true;
  //  console.log(this.morti)
  //  console.log(this.datesNumbers)
  }

  
   

//Le funzioni di grafico finiscono qui ---------------------------------------------
 

  getEntries(){ //mi prendo i dati
    return this.dataService.getData().subscribe( (response : CovidData[]) => {
      this.covidData = response;
      response.forEach(item => {
        this.countries.push(item.country); //pusha nel vettore le country
        console.log(this.countries); //check
      })
    
    })
  }
  ngOnInit() {
    
    this.getEntries() //prende i dati
    this.createGraph();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(  //filtro dimanico
        startWith(''),
        map(value => this._filter(value))
      );
  }
 
  //funzione per il filtro dinamico
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
 
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  

  
  
//    save(ev: any) {
//  a : HTMLCanvasElement;

//    $('#canvas')[0].toBlob((blob) => {
//     let URLObj = window.URL || window.webkitURL;
//     ev.target.href = URLObj.createObjectURL(blob)
//     ev.target.download = "untitled.png";
//   });
// }
 

// public buttonsTexts:Array<string> = ['Add Data'];

// public addButton(index:number):void {
//   this.buttonsTexts = [...this.buttonsTexts, `Data ${index+2}`];
// }


public buttonsTexts:Array<string> = ['Add Data'];

public addButton(index:number):void {
  this.buttonsTexts = [...this.buttonsTexts, `Data ${index+2}`];
}

public testiPulsante:Array<string> = ['Agg Data quiiii'];

public aggPulsante(index:number):void {
  this.testiPulsante = [...this.testiPulsante, `Data ${index+2}`];
}


// add(){ 
//   let row = document.createElement('div');   
//     row.className = 'row'; 
//     row.innerHTML = ` <br> <input type="text">`; 
//     document.querySelector('.showInputField').appendChild(row); 
// } 

async add(){ 
  let menu = document.createElement('form');   
    menu.className = ''; 
    menu.innerHTML = `
    <mat-form-field>
        <input type="text" placeholder="Choose a country" aria-label="Number" matInput [formControl]="myControl" [matAutocomplete]="auto" id="country" required [(ngModel)]="country">
        <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                {{option}}
            </mat-option>
        </mat-autocomplete>
    </mat-form-field>
</form>
<class="pt-5" #form="ngForm">
<div class="form-group row">
    <label for="continent" class="col-sm-2 col-form-label">Choose category</label>
    <div class="col-sm-10">
        <select class="form-control" id="sort" ngModel required name="sort">
            <option *ngFor="let option of sortingOptions"> {{option}} </option>
        </select>
    </div>
</div>`; 
    document.querySelector('.showInputField').appendChild(menu); 
} 

//Salvataggio su png--------------------------------------------------------------------------------
saveAsImage(){
  var chartHtml = document.getElementById('chartwrapper')as HTMLCanvasElement;
  var urlImage= chartHtml.toDataURL('image/png');
  var saveLink = document.getElementById('downloadLink') as HTMLAnchorElement;
  saveLink.href=urlImage;
   
 }

//Salvataggio in formato CSV

csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalseparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'Covid List :',
  useBom: true,
  noDownload: false,
  headers: ["date", "category value"]
};


pushArray(){
  var nuovoArray = new Array()

  for (let i = 0; i < this.dates.length; i++) {
    nuovoArray.push({
      "date":this.dates[i], "value":this.asseY[i]
    })
    
  }
    return nuovoArray;
    
  }

  downloadCSV(){
    //funzione che trasforma i dati dal database in formato Csv
    new AngularCsv(this.pushArray(), "Covid", this.csvOptions);}

}
