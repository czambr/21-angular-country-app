import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList],
})
export class ByRegionPage {}
