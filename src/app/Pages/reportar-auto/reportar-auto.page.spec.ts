import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportarAutoPage } from './reportar-auto.page';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReportarAutoPage', () => {
  let component: ReportarAutoPage;
  let fixture: ComponentFixture<ReportarAutoPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ReportarAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
