import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCountryPage {
  countryService = inject(CountryService);

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];
  //     return await firstValueFrom(this.countryService.searchByContry(params.query));
  //   },
  // });
  query = signal('');
  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByContry(params.query);
    },
  });
}
