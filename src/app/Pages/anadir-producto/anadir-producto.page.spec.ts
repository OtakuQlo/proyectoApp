import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirProductoPage } from './anadir-producto.page';

describe('AnadirProductoPage', () => {
  let component: AnadirProductoPage;
  let fixture: ComponentFixture<AnadirProductoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AnadirProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
