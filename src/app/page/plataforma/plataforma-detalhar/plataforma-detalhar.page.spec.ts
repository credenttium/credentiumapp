import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlataformaDetalharPage } from './plataforma-detalhar.page';

describe('PlataformaDetalharPage', () => {
  let component: PlataformaDetalharPage;
  let fixture: ComponentFixture<PlataformaDetalharPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformaDetalharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
