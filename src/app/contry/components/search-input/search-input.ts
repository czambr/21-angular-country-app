import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  templateUrl: './search-input.html',
})
export class SearchInput {
  value = output<string>();
  placeholderInput = input<string>('Buscar');
  debounceTime = input<number>(300);

  inputValue = signal<string>('');
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
