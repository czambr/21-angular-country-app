import { type Country } from '../interfaces/country.interface';
import { type RestCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(data: RestCountry): Country {
    return {
      ccn3: data.codes.alpha_3,
      flag: data.flag.emoji,
      flgaSvg: data.flag.url_svg,
      name: data.names.translations['spa'].official ?? 'No spanish name',
      capital: data.capitals.map((c) => c.name).join(','),
      population: data.population,
    };
  }

  static mapRestCountryArrayToCountryArray(arrayCountry: RestCountry[]): Country[] {
    return arrayCountry.map(this.mapRestCountryToCountry);
  }
}
