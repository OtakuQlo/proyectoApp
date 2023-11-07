import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContraPage } from './cambiar-contra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CambiarContraPage', () => {
  let component: CambiarContraPage;
  let fixture: ComponentFixture<CambiarContraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(CambiarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
