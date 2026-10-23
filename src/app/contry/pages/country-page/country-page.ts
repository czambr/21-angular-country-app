import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country';
import { NotFound } from '@/app/shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.html',
  imports: [NotFound, CountryInformation],
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  });
}
