import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportarAutoPage } from './reportar-auto.page';

describe('ReportarAutoPage', () => {
  let component: ReportarAutoPage;
  let fixture: ComponentFixture<ReportarAutoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ReportarAutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
