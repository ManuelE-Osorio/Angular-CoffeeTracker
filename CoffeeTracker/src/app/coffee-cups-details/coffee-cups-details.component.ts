import { Component, Input, OnInit, input } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { CoffeeCups } from '../coffee-cups';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-coffee-cups-details',
  standalone: true,
  imports: [ RouterLink, NgIf, ReactiveFormsModule ],
  templateUrl: './coffee-cups-details.component.html',
  styleUrl: './coffee-cups-details.component.css'
})
export class CoffeeCupsDetailsComponent implements OnInit{
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
    this.CoffeeCups = this.coffeeService.getCoffeeCup( id )
    console.log('cups')
    console.log(this.CoffeeCups)
  }

  goBack() {
    this.location.back();
    }
}
