import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Product } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  selectedFile!: File // to store uploaded file
  products:Product[] = []
  editingProduct: any = {};

constructor(private router: Router, private cardServ: CardService,private dialog:MatDialog) {}

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.cardServ.getProducts().subscribe(res => {
     this.products = res
    })
}

onFileSelected (event: Event) {
  const fileInput = event.target as HTMLInputElement
  if(fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0]
  }
}

addProduct(name: string, price:any,image: string) {

 const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
   if (this.selectedFile) {
    formData.append("image", this.selectedFile, this.selectedFile.name)
   }

  this.cardServ.addProduct(formData).subscribe(() => {
    this.loadProducts()
  })
}

deleteProduct(id: number) {
  this.cardServ.deleteProduct(id).subscribe(() => {
    this.products = this.products.filter((prod) => prod.id !== id)
  })
}

updateProduct(prod:any) {
const dialog= this.dialog.open(UpdateProductComponent,{
  data:prod
 })
 dialog.afterClosed().subscribe(res =>{
  this.loadProducts()
 })
}


}
