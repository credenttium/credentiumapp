import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlataformaCadastrarPage } from './plataforma-cadastrar.page';

describe('PlataformaCadastrarPage', () => {
  let component: PlataformaCadastrarPage;
  let fixture: ComponentFixture<PlataformaCadastrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformaCadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
