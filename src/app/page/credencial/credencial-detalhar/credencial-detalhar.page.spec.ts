import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredencialDetalharPage } from './credencial-detalhar.page';

describe('CredencialDetalharPage', () => {
  let component: CredencialDetalharPage;
  let fixture: ComponentFixture<CredencialDetalharPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CredencialDetalharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
