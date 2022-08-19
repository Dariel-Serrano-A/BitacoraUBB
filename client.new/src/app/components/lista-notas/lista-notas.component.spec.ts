/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaNotasComponent } from './lista-notas.component';

describe('ListaNotasComponent', () => {
  let component: ListaNotasComponent;
  let fixture: ComponentFixture<ListaNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
