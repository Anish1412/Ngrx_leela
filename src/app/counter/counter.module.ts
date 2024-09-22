import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CounterAppComponent } from "./counter-app/counter-app.component";
import { CounterButtonComponent } from "./counter-button/counter-button.component";
import { CounterComponent } from "./counter.component";
import { CustomInputIncrementComponent } from "./custom-input-increment/custom-input-increment.component";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { COUNTER_STATE_NAME } from "./Store/counter.selectors";
import { counterReducer } from "./Store/counter.reducer";

const routes:Routes = [
    {
        path:'',
        component:CounterComponent
    }
];
@NgModule({
    declarations:[
    CounterAppComponent,
    CounterButtonComponent,
    CustomInputIncrementComponent,
    CounterComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature(COUNTER_STATE_NAME,counterReducer)
    ]
})
export class CounterModule {}