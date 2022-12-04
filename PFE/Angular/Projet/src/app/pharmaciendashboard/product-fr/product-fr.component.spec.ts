import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFrComponent } from './product-fr.component';

describe('ProductFrComponent', () => {
  let component: ProductFrComponent;
  let fixture: ComponentFixture<ProductFrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
