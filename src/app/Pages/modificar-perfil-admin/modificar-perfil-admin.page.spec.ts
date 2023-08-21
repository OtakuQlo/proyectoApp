import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilAdminPage } from './modificar-perfil-admin.page';

describe('ModificarPerfilAdminPage', () => {
  let component: ModificarPerfilAdminPage;
  let fixture: ComponentFixture<ModificarPerfilAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarPerfilAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
