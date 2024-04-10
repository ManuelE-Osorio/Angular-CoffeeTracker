import { Component, Input, OnInit, input } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { CoffeeCups, CoffeeCupsForm } from '../coffee-cups';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-coffee-cups-details',
  standalone: true,
  imports: [ RouterLink, NgIf, ReactiveFormsModule ],
  templateUrl: './coffee-cups-details.component.html',
  styleUrl: './coffee-cups-details.component.css'
})
export class CoffeeCupsDetailsComponent implements OnInit{
  form = new FormGroup<CoffeeCupsForm>();
  quantity = new FormControl<number>(this.CoffeeCups?.quantity ?? 0);


  CoffeeCups? : CoffeeCups

  constructor( 
    private route: ActivatedRoute,
    private coffeeService : CoffeeCupsService,
    private location: Location
  ) {}
  
  ngOnInit() : void {
    console.log("startup")
    this.getCoffeeCup();
  }

  getCoffeeCup(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coffeeService.getCoffeeCup(id).subscribe( resp => {
      if( resp.body != null){
        this.CoffeeCups = {
          id: resp.body.id,
          description: resp.body.description,
          date : new Date(resp.body.date),
          measure : resp.body.measure,
          quantity : resp.body.quantity,
          units : resp.body.units,
        }
      }
    });
  }

  goBack() {
    this.location.back();
    }
}
