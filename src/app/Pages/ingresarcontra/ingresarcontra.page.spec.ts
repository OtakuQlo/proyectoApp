import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarcontraPage } from './ingresarcontra.page';

describe('IngresarcontraPage', () => {
  let component: IngresarcontraPage;
  let fixture: ComponentFixture<IngresarcontraPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(IngresarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
