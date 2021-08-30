import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardscarouselComponent } from './cardscarousel.component';

describe('CardscarouselComponent', () => {
  let component: CardscarouselComponent;
  let fixture: ComponentFixture<CardscarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardscarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardscarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
