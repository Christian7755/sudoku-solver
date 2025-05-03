import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuGridComponent } from './sudoku-grid.component';

describe('SudokuGridComponent', () => {
  let component: SudokuGridComponent;
  let fixture: ComponentFixture<SudokuGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
