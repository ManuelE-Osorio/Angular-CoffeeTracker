import { Component, OnInit } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { map } from 'rxjs';
import { CoffeeCups } from '../coffee-cups';
import { NgFor } from '@angular/common';
import { CoffeeMeasureUnits } from '../coffee-cups';
import { formatDate } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-coffee-cups-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './coffee-cups-list.component.html',
  styleUrl: './coffee-cups-list.component.css'
})

export class CoffeeCupsListComponent implements OnInit{
  cup : CoffeeCups | undefined
  coffeeCups : CoffeeCups[] = []


  constructor (
    private coffeeService : CoffeeCupsService
  ) {}

  getCups()
  {
    this.coffeeCups = this.coffeeService.getCoffeeCups()
    console.log("Get Cups")
  }

  ngOnInit() : void {
    this.getCups()
  }

  getEnumString( units: CoffeeMeasureUnits) : string {
    return CoffeeMeasureUnits[units]
  }

}
