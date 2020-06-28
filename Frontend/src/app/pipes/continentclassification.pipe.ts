import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'continentclassification'
})
export class ContinentclassificationPipe implements PipeTransform {

  transform(value: any, classification : string, continent: string): any { //value è l'array di covid
  let myArray=[];
    
    //metti array d'appoggio
    for(var i=0; i<value.length;i++){
      if(value[i].classification ===classification 
        && value[i].continent === continent){
        myArray.push(value[i]);
      }
    }
    console.log("My array", myArray)
    return myArray;
  }


}
