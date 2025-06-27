import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productparent } from './productparent';

describe('Productparent', () => {
  let component: Productparent;
  let fixture: ComponentFixture<Productparent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productparent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productparent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
