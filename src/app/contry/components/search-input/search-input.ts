import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  templateUrl: './search-input.html',
})
export class SearchInput {
  public value = output<string>();
  public placeholderInput = input<string>('Buscar');
  public debounceTime = input<number>(300);
  public initialValue = input<string>('');

  private inputValue = linkedSignal<string>(() => this.initialValue());
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
