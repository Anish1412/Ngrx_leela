import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputIncrementComponent } from './custom-input-increment.component';

describe('CustomInputIncrementComponent', () => {
  let component: CustomInputIncrementComponent;
  let fixture: ComponentFixture<CustomInputIncrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputIncrementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInputIncrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
