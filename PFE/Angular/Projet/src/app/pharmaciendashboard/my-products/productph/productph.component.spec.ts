import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductphComponent } from './productph.component';

describe('ProductphComponent', () => {
  let component: ProductphComponent;
  let fixture: ComponentFixture<ProductphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
