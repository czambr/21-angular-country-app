import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input.required<Country[]>();
}
