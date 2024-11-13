import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroScreenComponent } from './zero-screen.component';

describe('ZeroScreenComponent', () => {
  let component: ZeroScreenComponent;
  let fixture: ComponentFixture<ZeroScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ZeroScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
