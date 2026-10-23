import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';

import { TOKEN_API_COUNTRY } from '@/envs';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';

// https://restcountries.com/docs/countries#read-by-property
const API_URL = 'https://api.restcountries.com/countries/v5';

@Service()
export class CountryService {
  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        catchError(() => {
          return throwError(() => new Error(`No se pudo obtener países con ese ${query}`));
        }),
      );
  }

  searchByContry(query: string) {
    query = query.toLocaleLowerCase();
    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/name?q=${query}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        catchError(() => {
          return throwError(() => new Error(`No se pudo obtener el pais buscado ${query}`));
        }),
      );
  }

  searchCountryByAlphaCode(code: string) {
    code = code.toLocaleLowerCase();
    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/code?q=${code}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        map((countries) => countries.at(0)),
        catchError(() => {
          return throwError(
            () => new Error(`No se pudo obtener la información del pais con código: ${code}`),
          );
        }),
      );
  }
}
