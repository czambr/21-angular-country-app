import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.html',
  imports: [DecimalPipe, RouterLink],
})
export class CountryList {
  countries = input.required<Country[]>();
}
