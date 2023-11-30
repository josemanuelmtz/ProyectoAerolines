import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservaComponent } from './gestion-reserva.component';

describe('GestionReservaComponent', () => {
  let component: GestionReservaComponent;
  let fixture: ComponentFixture<GestionReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
