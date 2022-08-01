import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraListComponent } from './bitacora-list.component';

describe('BitacoraListComponent', () => {
  let component: BitacoraListComponent;
  let fixture: ComponentFixture<BitacoraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitacoraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
