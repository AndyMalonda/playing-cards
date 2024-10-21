import { Component, EventEmitter, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  search = model<string>('');

  searchButtonClicked = output({ alias: 'submit' });

  searchClick() {
    this.searchButtonClicked.emit();
  }

  updateSearch(value: string) {
    this.search.set(value)
  }
}
