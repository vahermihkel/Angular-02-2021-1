import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeItemComponent } from './size-item.component';

describe('SizeItemComponent', () => {
  let component: SizeItemComponent;
  let fixture: ComponentFixture<SizeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SizeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
