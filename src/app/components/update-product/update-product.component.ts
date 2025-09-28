import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../passMatchValidator';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export const TOKEN = 'token';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.html',
  styleUrl: './update-product.scss',
})
export class UpdateProductComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private cardServ = inject(CardService);
  selectedFile!: File; // to store uploaded file

  updateProductForm = this.fb.group({
    name: [''],
    price: [''],
    description: [''],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef:MatDialogRef<UpdateProductComponent>) {
    this.updateProductForm.patchValue({
      name: data.name,
      price: data.price,
      description: data.description,
    });
  }
  onSubmit() {
    if (this.updateProductForm.valid) {
      const name = this.updateProductForm.get('name')?.value || '';
      const price = this.updateProductForm.get('price')?.value || '';
      const description =
        this.updateProductForm.get('description')?.value || '';
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.cardServ.updateProduct(this.data.id, formData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
}
