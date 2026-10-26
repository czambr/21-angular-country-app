import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';

import { TOKEN_API_COUNTRY } from '@/envs';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';

// https://restcountries.com/docs/countries#read-by-property
const API_URL = 'https://api.restcountries.com/countries/v5';

@Service()
export class CountryService {
  private httpClient = inject(HttpClient);

  // Stores
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<string, Country[]>();

  // Methdos for search
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) || []);
    }

    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError(() => {
          return throwError(() => new Error(`No se pudo obtener países con ese ${query}`));
        }),
      );
  }

  searchByContry(query: string) {
    query = query.toLocaleLowerCase();
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) || []);
    }

    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/name?q=${query}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: string) {
    if (this.queryCacheByRegion.has(region)) {
      return of(this.queryCacheByRegion.get(region) || []);
    }

    return this.httpClient
      .get<RESTCountryResponse>(`${API_URL}/region/${region}`, {
        headers: {
          Authorization: `Bearer ${TOKEN_API_COUNTRY}`,
        },
      })
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        tap((countries) => this.queryCacheByRegion.set(region, countries)),
        catchError(() => {
          return throwError(() => new Error(`No se pudo obtener la region buscada ${region}`));
        }),
      );
  }
}
