/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecordatorioListComponent } from './recordatorio-list.component';

describe('RecordatorioListComponent', () => {
  let component: RecordatorioListComponent;
  let fixture: ComponentFixture<RecordatorioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordatorioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordatorioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
