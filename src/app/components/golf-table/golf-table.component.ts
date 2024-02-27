import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatSocketService } from '../../../services/statSocketService/stat-socket.service';
import { MstTableComponent } from '../mst-table/mst-table.component';
import { UseMSTDataGrid } from '../../../hooks/useMSTDataGrid/use-mstdata-grid';
import { ChangeDetectorRef } from '@angular/core';
import { MSTDataSourceService } from '../../../services/mstDataService/mstdata-source.service';

@Component({
  selector: 'app-golf-table',
  standalone: true,
  templateUrl: './golf-table.component.html',
  styleUrl: './golf-table.component.scss',
  providers: [StatSocketService],
  imports: [MstTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GolfTableComponent extends UseMSTDataGrid implements OnInit {
  golfPlayerData: GolfPlayerDataType[] = [];
  rowsData: MstGridRowsDataType[] = [];
  
  constructor(
    private statSocketService: StatSocketService, 
    private cdRef: ChangeDetectorRef,
    private mstDataSourceService: MSTDataSourceService
    ) {
    super()
    this.rowData = []
    this.rowsPerPageOptions = [15, 25, 50, 100, 250]
    this.rowsPerPage = this.rowsPerPageOptions[0];
    this.colData = [
      {
        field: 'rank',
        title: 'Rank',
        width: 60
      },
      {
        field: 'name',
        title: 'Name',
      },
      {
        field: 'sex',
        title: 'Sex',
        width: 60
      },
      {
        field: 'nationality',
        title: 'Nationality',
        width: 150
      },
      {
        field: 'alias',
        title: 'TV Alias',
        width: 100
      },
      {
        field: 'tournamentId',
        title: 'Tournament ID',
        width: 200
      },
      {
        field: 'match',
        title: 'Match',
        width: 100
      },
      {
        field: 'totalStrokes',
        title: 'Total Strokes',
        width: 120
      },
      {
        field: 'parStrokes',
        title: 'Course Par',
        width: 110
      },
      {
        field: 'aboveBelowPar',
        title: '+/- Par',
        width: 100
      }

    ];

    this.orderBy = 'name';
    this.order = "asc"
  }

  ngOnInit(): void {
    // The commented out code is from where I used my own socket that took the data being fed in and stored it into mongo
    // When the user connected it would send all the saved rows and fill the table out quicker (removed this as it is unrequired but happy to show if through to interview)

    // this.statSocketService.listen('connected').subscribe((data) => {
    //   this.golfPlayerData = data
    //   this.refreshGrid();
    // });

    this.mstDataSourceService.subscribeToRowsDataChanges((rowsData) => {
      this.rowsData = rowsData
    })
    
    this.statSocketService.listen('data-update').subscribe((data) => {
      this.handleAddPlayerRecord(data);
    });

    // this.statSocketService.listen('row-update').subscribe((data) => {
    //   this.handleUpdatePlayerRecord(data);
    // });
  };

  handleAddPlayerRecord(newPlayerData: any) {
    this.golfPlayerData.push(newPlayerData);
    this.refreshGrid();
  };

  handleUpdatePlayerRecord(updatedPlayerData: any) {
    const playerIndex = this.golfPlayerData.findIndex((player) => player.MSTID === updatedPlayerData.MSTID);
    this.golfPlayerData.splice(playerIndex, 1, updatedPlayerData);
    this.refreshGrid();
  };

  handlePageChange(event: unknown, page: number): void {
    this.page = page;
    this.refreshGrid();
  };

  handleRowsPerPageChange(event: unknown, rowsPerPage: number): void {
    this.resetPage();
    this.rowsPerPage = rowsPerPage;
    this.refreshGrid();
  };

  handleRequestSort(event: any, field: any): void { // change field interface to SortTypes
    this.resetPage();
    this.updateOrder(field);
    this.refreshGrid();
  }

  handleRequestFilter(event: any, field: any): void { //FilterTypes
    this.resetPage();
    this.updateFilter(field);
    this.refreshGrid();
  }

  handleResetFilter(event: any): void {
    this.resetPage();
    this.updateFilter({
      filterField: '',
      filterValue: '',
      filterType: ''
    });
    this.refreshGrid();
  }

  refreshGrid() {
    this.rowsComparator(this.golfPlayerData, this.colData);
  }

  rowsComparator(rowsData: MstGridRowsDataType[], colsData: MstGridColsDataType[]) {
    this.rowData = [...rowsData.map(value => {
      return {
        key: value['MSTID'],
        id: value['MSTID'],
        rank: value['leaderboardID'], // I know this isn't rank and proabably relates to something else :)
        name: (` ${value['First']} ${value['Last']} <img src="https://flagcdn.com/16x12/${(value['Nationality'].toLowerCase()).replace(/.$/, "")}.png" alt="${value['Nationality']}" />` ),
        sex: value['Sex'] === 'M' ? 'Male' : 'Female',
        nationality: value['Nationality'],
        alias: value['TVName'],
        tournamentId: value['tournamentID'],
        match: value['Match'],
        totalStrokes: value['TotalStrokes'],
        parStrokes: value['TotalStrokes'] - value['TotalSTP'],
        aboveBelowPar: value['TotalSTP']      
      }
    })];
    this.updateMSTDataSource();
    this.cdRef.detectChanges();
  }

  private updateMSTDataSource() {
    this.mstDataSourceService.dataSet = {
      rowData: this.rowData,
      rowCount: this.rowData.length
    }
    this.mstDataSourceService. params = {
      limit: this.rowsPerPage,
      skip: this.page * this.rowsPerPage,
      sortField: this.orderBy,
      sortDirection: this.order,
      filterField: this.filterField,
      filterValue: this.filterValue,
      filterType: this.filterType
    }
    this.mstDataSourceService.ngOnChanges({});
  }

}
