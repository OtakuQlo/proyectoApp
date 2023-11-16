import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaProductoPage } from './pagina-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

describe('PaginaProductoPage', () => {
  let component: PaginaProductoPage;
  let fixture: ComponentFixture<PaginaProductoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
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
