import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfTableComponent } from './golf-table.component';

describe('GolfTableComponent', () => {
  let component: GolfTableComponent;
  let fixture: ComponentFixture<GolfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GolfTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GolfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
