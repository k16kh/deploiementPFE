import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienEtreComponent } from './bien-etre.component';

describe('BienEtreComponent', () => {
  let component: BienEtreComponent;
  let fixture: ComponentFixture<BienEtreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BienEtreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienEtreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
