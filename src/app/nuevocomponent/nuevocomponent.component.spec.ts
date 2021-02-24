import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevocomponentComponent } from './nuevocomponent.component';

describe('NuevocomponentComponent', () => {
  let component: NuevocomponentComponent;
  let fixture: ComponentFixture<NuevocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevocomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
