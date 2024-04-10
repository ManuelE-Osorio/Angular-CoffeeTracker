export interface CoffeeCups {
    id: number;
    quantity: number;
    measure: number;
    description: string;
    units: CoffeeMeasureUnits;
    date: Date
}

export enum CoffeeMeasureUnits {
    ml = 0,
    oz = 1
}