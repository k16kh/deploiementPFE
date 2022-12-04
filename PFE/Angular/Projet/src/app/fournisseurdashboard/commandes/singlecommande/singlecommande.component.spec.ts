import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecommandeComponent } from './singlecommande.component';

describe('SinglecommandeComponent', () => {
  let component: SinglecommandeComponent;
  let fixture: ComponentFixture<SinglecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
