import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaEmpresaComponent } from './agrega-empresa.component';

describe('AgregaEmpresaComponent', () => {
  let component: AgregaEmpresaComponent;
  let fixture: ComponentFixture<AgregaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
