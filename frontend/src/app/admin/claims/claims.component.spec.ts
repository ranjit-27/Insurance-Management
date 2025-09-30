import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimsComponent } from './claims.component';

describe('ClaimsComponent', () => {
  let component: AdminClaimsComponent;
  let fixture: ComponentFixture<AdminClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
