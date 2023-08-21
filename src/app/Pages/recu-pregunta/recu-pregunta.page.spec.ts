import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuPreguntaPage } from './recu-pregunta.page';

describe('RecuPreguntaPage', () => {
  let component: RecuPreguntaPage;
  let fixture: ComponentFixture<RecuPreguntaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecuPreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
