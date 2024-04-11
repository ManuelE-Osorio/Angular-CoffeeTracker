import { Component, Input, OnInit, input } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { CoffeeCups, CoffeeCupsForm, CoffeeMeasureUnits } from '../coffee-cups';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location, NgIf, formatDate } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-coffee-cups-details',
  standalone: true,
  imports: [ RouterLink, NgIf, ReactiveFormsModule ],
  templateUrl: './coffee-cups-details.component.html',
  styleUrl: './coffee-cups-details.component.css'
})
export class CoffeeCupsDetailsComponent implements OnInit{
  form : FormGroup<CoffeeCupsForm> = new FormGroup<CoffeeCupsForm>({
    id: new FormControl<number>(0, {nonNullable: true}),
    quantity: new FormControl<number>(0, { nonNullable: true }),
    measure: new FormControl<number>(0, { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    units: new FormControl<CoffeeMeasureUnits>(CoffeeMeasureUnits.ml, {nonNullable: true}),
    date: new FormControl<Date>(new Date(), {nonNullable: true})
  });;



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
          date : formatDate(resp.body.date, 'yyyy-MM-dd','en'),
          measure : resp.body.measure,
          quantity : resp.body.quantity,
          units : resp.body.units,
        }
        this.setForm()
      }
    });
  }

  setForm(){
    if (this.CoffeeCups != null){
      this.form.controls.id.setValue(this.CoffeeCups.id)
      this.form.controls.quantity.setValue(this.CoffeeCups.quantity)
      this.form.controls.measure.setValue(this.CoffeeCups.measure)
      this.form.controls.description.setValue(this.CoffeeCups.description)
      this.form.controls.units.setValue(this.CoffeeCups.units)
      this.form.controls.date.setValue(this.CoffeeCups.date)
    }
    console.log(this.form.controls.date.value)
    console.log(this.CoffeeCups?.date)
  }

  submitForm(){
    console.log(typeof(this.form.controls.date.value))
    console.log(this.form.value)
  }

  goBack() {
    this.location.back();
    }
}
