import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCirculoComponent } from './tarjeta-circulo.component';

describe('TarjetaCirculoComponent', () => {
  let component: TarjetaCirculoComponent;
  let fixture: ComponentFixture<TarjetaCirculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaCirculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCirculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
