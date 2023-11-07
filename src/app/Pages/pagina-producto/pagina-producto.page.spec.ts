import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaProductoPage } from './pagina-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaginaProductoPage', () => {
  let component: PaginaProductoPage;
  let fixture: ComponentFixture<PaginaProductoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(PaginaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
