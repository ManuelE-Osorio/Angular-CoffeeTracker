import { Component, OnInit } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { map } from 'rxjs';
import { CoffeeCups } from '../coffee-cups';
import { NgFor, NgIf } from '@angular/common';
import { CoffeeMeasureUnits } from '../coffee-cups';
import { formatDate } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-coffee-cups-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, ReactiveFormsModule, NotificationsComponent],
  templateUrl: './coffee-cups-list.component.html',
  styleUrl: './coffee-cups-list.component.css'
})

export class CoffeeCupsListComponent implements OnInit{

  coffeeCups : CoffeeCups[] | undefined = []
  form : FormGroup = new FormGroup({
    date: new FormControl<string | null >( null, {})
  });

  constructor (
    private coffeeService : CoffeeCupsService
  ) {}

  getCups( date?: string)
  {
    this.coffeeService.getCoffeeCups(date).subscribe( resp =>
      this.coffeeCups = resp.body?.map( cups => {
        return {id: cups.id, description : cups.description,
          date : new Date(cups.date),
          measure : cups.measure,
          quantity : cups.quantity,
          units : cups.units}
      })
    );
  }

  ngOnInit() : void {
    this.getCups()
  }

  getEnumString( units: CoffeeMeasureUnits) : string {
    return CoffeeMeasureUnits[units]
  }

  submitForm() {
    if( this.form.valid && this.form.controls['date'].value != null) {
      this.getCups(this.form.controls['date'].value)
    }
  }
}
