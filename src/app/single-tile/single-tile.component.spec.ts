import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTileComponent } from './single-tile.component';

describe('SingleTileComponent', () => {
  let component: SingleTileComponent;
  let fixture: ComponentFixture<SingleTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
