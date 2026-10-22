import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  templateUrl: './search-input.html',
})
export class SearchInput {
  value = output<string>();
  placeholderInput = input<string>('Buscar');
}
