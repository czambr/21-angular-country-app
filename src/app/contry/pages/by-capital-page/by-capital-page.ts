import { Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCapitalPage {
  onSearch(value: string) {
    console.log({ value });
  }
}
