import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: any = '';
  productDetails: any = []

  constructor(private route: ActivatedRoute, private cardServ: CardService) {
    this.id = this.route.snapshot.params['id'];

    this.cardServ.getProducts().subscribe((prod) => {
      this.productDetails = prod.find((p) => p.id == this.id);
    });

    //  this.productDetails = this.cardServ.getProducts().find(       (if products is static )
    //   (p: any) => p.id === this.id
  }
}
