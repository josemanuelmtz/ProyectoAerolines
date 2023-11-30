import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaVuelosComponent } from './agrega-vuelos.component';

describe('AgregaVuelosComponent', () => {
  let component: AgregaVuelosComponent;
  let fixture: ComponentFixture<AgregaVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaVuelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
