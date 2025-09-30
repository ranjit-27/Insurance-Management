import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AclaimsComponent } from './aclaims.component';

describe('AclaimsComponent', () => {
  let component: AclaimsComponent;
  let fixture: ComponentFixture<AclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AclaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
