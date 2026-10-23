import { Country } from '@/app/contry/interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'country-information',
  templateUrl: './country-information.html',
  imports: [DecimalPipe],
})
export class CountryInformation {
  country = input.required<Country>();
  curentYear = computed(() => {
    return new Date().getFullYear();
  });
}
