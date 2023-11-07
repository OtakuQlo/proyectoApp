import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuContraPage } from './recu-contra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecuContraPage', () => {
  let component: RecuContraPage;
  let fixture: ComponentFixture<RecuContraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(RecuContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
