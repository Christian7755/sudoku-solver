import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayLoginComponent } from './play-login.component';

describe('PlayLoginComponent', () => {
  let component: PlayLoginComponent;
  let fixture: ComponentFixture<PlayLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
