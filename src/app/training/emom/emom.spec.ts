import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emom } from './emom';

describe('Emom', () => {
  let component: Emom;
  let fixture: ComponentFixture<Emom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
