/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordatorioComponent } from './recordatorio.component';

describe('RecordatorioComponent', () => {
  let component: RecordatorioComponent;
  let fixture: ComponentFixture<RecordatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
