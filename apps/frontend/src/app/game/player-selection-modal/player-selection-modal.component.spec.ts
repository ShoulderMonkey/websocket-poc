import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionModalComponent } from './player-selection-modal.component';

describe('PlayerSelectionModalComponent', () => {
  let component: PlayerSelectionModalComponent;
  let fixture: ComponentFixture<PlayerSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSelectionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
