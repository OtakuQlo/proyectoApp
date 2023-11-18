import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaProductoPage } from './pagina-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'uppercase'})
class MockUppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('PaginaProductoPage', () => {
  let component: PaginaProductoPage;
  let fixture: ComponentFixture<PaginaProductoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,CommonModule],
      declarations: [PaginaProductoPage,MockUppercasePipe],
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
