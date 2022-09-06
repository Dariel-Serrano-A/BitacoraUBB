/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordatorioFormComponent } from './recordatorio-form.component';

describe('RecordatorioFormComponent', () => {
  let component: RecordatorioFormComponent;
  let fixture: ComponentFixture<RecordatorioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordatorioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordatorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
