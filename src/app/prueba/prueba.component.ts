import { Component } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

  cities: City[] | undefined;

    selectedCity: City | undefined;

    newCity:City ={name:'London',code:'LDN'};

    ngOnInit() {

      this.editCity(this.newCity);

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    editCity(city:City){
      this.selectedCity = {...city};

    }

}
