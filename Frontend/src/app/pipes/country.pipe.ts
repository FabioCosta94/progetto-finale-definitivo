import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(value: any, arg: string): any { //value è l'array di covid
    let myArray=[];
    console.log("value", value, "args: ", arg)
    for(var i=0; i<value.length;i++){
      if(value[i].country ===arg){  //in questo caso arg è una stringa
        myArray.push(value[i]);
        //Assegna ad arg l'id nazione perchè possa essere usato nell'html
        document.getElementById('nazione').innerHTML = arg;
      }
    }




    console.log("My array", myArray)
    return myArray;
  }




}
