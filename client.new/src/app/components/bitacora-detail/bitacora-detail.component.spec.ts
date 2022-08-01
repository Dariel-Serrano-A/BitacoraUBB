import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraDetailComponent } from './bitacora-detail.component';

describe('BitacoraDetailComponent', () => {
  let component: BitacoraDetailComponent;
  let fixture: ComponentFixture<BitacoraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
