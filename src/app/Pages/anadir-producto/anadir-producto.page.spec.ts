import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirProductoPage } from './anadir-producto.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AnadirProductoPage', () => {
  let component: AnadirProductoPage;
  let fixture: ComponentFixture<AnadirProductoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AnadirProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
