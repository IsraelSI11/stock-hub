import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export default class CategoryFormComponent implements OnInit {

  
  private route = inject(ActivatedRoute);

  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  inventoryId = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inventoryId = params['id'];
    });
  }

  submitted = false;

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });

  onSubmit(): void {
    this.submitted = true;
    if (this.categoryForm.valid) {
      this.categoryService.addCategory({
        name: this.categoryForm.value.name!,
      }, this.inventoryId).subscribe({
        next: () => console.log('Categoría agregada'),
        error: (err) => console.log('Error al agregar categoría', err)
      });
    }
  }

  clearSubmitted(): void {
    this.submitted = false;
  }
}
