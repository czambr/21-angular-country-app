import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCountryPage {
  countryService = inject(CountryService);

  query = signal('');
  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByContry(params.query));
    },
  });
}
