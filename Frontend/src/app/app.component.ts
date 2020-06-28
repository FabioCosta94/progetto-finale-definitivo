import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { CovidData } from './models/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  covidData: CovidData [];
  loading = true;
  constructor(private dataService: DataService){

  }

  ngOnInit(): void {
    this.getEntries()
  }

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
      this.loading=false;
    })
  }
}
