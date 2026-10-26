import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country';
import { Router, ActivatedRoute } from '@angular/router';

import { CountryList } from '../../components/country-list/country-list';
import { Region } from '../../interfaces/region.interface';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] || 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.html',
  imports: [CountryList],
})
export class ByRegionPage {
  countryService = inject(CountryService);
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') || '';

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),

    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: params.region },
      });

      return this.countryService.searchByRegion(params.region);
    },
  });
}
