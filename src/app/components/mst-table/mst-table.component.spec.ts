import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstTableComponent } from './mst-table.component';

describe('MstTableComponent', () => {
  let component: MstTableComponent;
  let fixture: ComponentFixture<MstTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MstTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MstTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
