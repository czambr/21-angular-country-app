import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.html',
  imports: [SearchInput, CountryList],
})
export class ByCountryPage {
  countryService = inject(CountryService);

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];
  //     return await firstValueFrom(this.countryService.searchByContry(params.query));
  //   },
  // });
  query = linkedSignal(() => this.queryParam);
  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: { query: params.query },
      });
      return this.countryService.searchByContry(params.query);
    },
  });
}
