import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule} from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-filter-toolbar',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatButtonModule, MatChipsModule, MatIcon],
  templateUrl: './filter-toolbar.component.html',
  styleUrl: '../mst-table.component.scss'
})
export class FilterToolbarComponent {
  @Input() columns: MstGridColsDataType[] = [];
  @Input() filterStatus?: any = '';
  @Input() onRequestFilter?: (event: any, filter: any) => void = () => {}; //FilterTypes
  @Input() onResetFilter?: (event: any) => void = () => {};

  showToolBar: boolean = true;
  isFiltering: boolean = false;
  selectedCol: string = '';

  fieldDescription: string | null = null;
  filterField: string = '';
  filterValue: string = '';
  filterType: string = 'textFilter';

  handleSelectColumn(value: string) {
    const [field, description] = value.split('|')
    this.filterField = field;
    this.fieldDescription = description
  }

  handleFilterTextChange(event: any) {
    this.filterValue = event.target.value;
  }

  handleResetFilter(event: any) {
    this.filterField = '';
    this.filterValue = '';
    this.onResetFilter && this.onResetFilter(event);
  }

  handleRequestFilter(event: any) {
    this.showToolBar = false;
    this.isFiltering = true;
    this.onRequestFilter && this.onRequestFilter(event, {
      filterField: this.filterField,
      filterValue: this.filterValue,
      filterType: this.filterType
    })
  }
  
}
