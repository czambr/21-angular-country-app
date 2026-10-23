import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByCapital(params.query));
    },
  });
}
