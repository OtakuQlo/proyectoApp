import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductoPage } from './modificar-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModificarProductoPage', () => {
  let component: ModificarProductoPage;
  let fixture: ComponentFixture<ModificarProductoPage>;

  beforeEach(async() => {
    +await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
