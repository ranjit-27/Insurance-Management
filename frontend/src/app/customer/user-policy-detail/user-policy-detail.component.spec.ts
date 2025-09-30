import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPolicyDetailComponent } from './user-policy-detail.component';

describe('UserPolicyDetailComponent', () => {
  let component: UserPolicyDetailComponent;
  let fixture: ComponentFixture<UserPolicyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPolicyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPolicyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
