import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: any = '';
  productDetails: any = []
 animal: string=""
  name: string=""

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {name: this.name, password: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  constructor(private route: ActivatedRoute, private cardServ: CardService,public dialog: MatDialog) {
    this.id = this.route.snapshot.params['id'];

    this.cardServ.getProducts().subscribe((prod) => {
      this.productDetails = prod.find((p) => p.id == this.id);
    });

    //  this.productDetails = this.cardServ.getProducts().find(       (if products is static )
    //   (p: any) => p.id === this.id
  }
}
