import { Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCountryPage {}
