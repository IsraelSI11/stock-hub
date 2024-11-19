import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditFormDialogComponent } from './product-edit-form-dialog.component';

describe('ProductEditFormDialogComponent', () => {
  let component: ProductEditFormDialogComponent;
  let fixture: ComponentFixture<ProductEditFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
