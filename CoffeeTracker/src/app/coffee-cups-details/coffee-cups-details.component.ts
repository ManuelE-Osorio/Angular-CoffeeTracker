import { Component, Input, OnInit, input } from '@angular/core';
import { CoffeeCupsService } from '../coffee-cups.service';
import { CoffeeCups, CoffeeCupsForm, CoffeeMeasureUnits, CoffeeMeasureUnitsMapping } from '../coffee-cups';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location, NgFor, NgIf, formatDate } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-coffee-cups-details',
  standalone: true,
  imports: [ RouterLink, NgIf, ReactiveFormsModule, NgFor ],
  templateUrl: './coffee-cups-details.component.html',
  styleUrl: './coffee-cups-details.component.css'
})

export class CoffeeCupsDetailsComponent implements OnInit{
  form : FormGroup<CoffeeCupsForm> = new FormGroup<CoffeeCupsForm>({
    id: new FormControl<number>(0, {nonNullable: true, validators: Validators.required} ),
    quantity: new FormControl<number>(0, {nonNullable: true, validators: Validators.required}),
    measure: new FormControl<number>(0, {nonNullable: true, validators: Validators.required}),
    description: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    units: new FormControl<CoffeeMeasureUnits>(CoffeeMeasureUnits.ml, {nonNullable: true, validators: Validators.required}),
    date: new FormControl<string>(new Date().toLocaleDateString(), {nonNullable: true, validators: Validators.required})
  });

  CoffeeCups!: CoffeeCups;
  Units = Object.values(CoffeeMeasureUnits).filter(value => typeof(value) === 'number');;
  UnitsMapping = CoffeeMeasureUnitsMapping


  constructor( 
    private route: ActivatedRoute,
    private coffeeService : CoffeeCupsService,
    private location: Location,
    private router: Router
  ) {}
  
  ngOnInit() {
    console.log("startup")
    if(Number(this.route.snapshot.paramMap.get('id')) === 0){
      this.CoffeeCups = { id: 0, quantity: 0, measure: 0, description: "", units: 0, date: new Date(Date.now())}
      this.router.navigate(["coffeecups/details/5"])
      .then(() => {
        window.location.reload();
      });
    }
    else {
    this.getCoffeeCup();
    }
 
  }

  getCoffeeCup() {
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
        this.setForm()
      }
    });
  }

  putCoffeeCup() {
    console.log(this.CoffeeCups)
    this.coffeeService.putCoffeeCup(this.CoffeeCups).subscribe( resp => {
      if( resp.body != null) {
        this.CoffeeCups = {
          id: resp.body.id,
          description: resp.body.description,
          date : new Date(resp.body.date),
          measure : resp.body.measure,
          quantity : resp.body.quantity,
          units : resp.body.units,
        }
        this.setForm()
      }
    })
  }

  deleteCoffeeCup( id: number ) {  //what to subscribe?? if success redirect
    this.coffeeService.deleteCoffeeCup(id).subscribe(

    )
  }

  setForm(){
    if (this.CoffeeCups != null){
      this.form.controls.id.setValue(this.CoffeeCups.id)
      this.form.controls.quantity.setValue(this.CoffeeCups.quantity)
      this.form.controls.measure.setValue(this.CoffeeCups.measure)
      this.form.controls.description.setValue(this.CoffeeCups.description)
      this.form.controls.units.setValue(this.CoffeeCups.units)
      this.form.controls.date.setValue(formatDate(this.CoffeeCups.date, 'yyyy-MM-dd', 'en'))
    }
  }

  submitForm(){ //Validate form
    console.log(this.form.value)
    console.log(this.form.valid)
    if(this.form.valid){
      this.CoffeeCups = Object.assign(this.CoffeeCups, this.form.value);
      this.putCoffeeCup();
    }
  }

  goBack() {
    this.location.back();
    }
}
