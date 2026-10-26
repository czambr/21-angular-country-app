import { Component, inject, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList],
})
export class ByRegionPage {
  countryService = inject(CountryService);
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),

    stream: ({ params }) => {
      if (!params.region) return of([]);
      return this.countryService.searchByRegion(params.region);
    },
  });
}
