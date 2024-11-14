import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryUsersComponent } from './inventory-users.component';

describe('InventoryUsersComponent', () => {
  let component: InventoryUsersComponent;
  let fixture: ComponentFixture<InventoryUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
