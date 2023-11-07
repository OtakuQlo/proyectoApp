import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarcontraPage } from './ingresarcontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('IngresarcontraPage', () => {
  let component: IngresarcontraPage;
  let fixture: ComponentFixture<IngresarcontraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(IngresarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
