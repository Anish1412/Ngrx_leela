import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../Store/counter.state';
import { Subscription, Observable } from 'rxjs';
import { getCounter } from 'src/app/counter/Store/counter.selectors';
import { AppState } from '../../Store/app.state';

@Component({
  selector: 'app-counter-app',
  templateUrl: './counter-app.component.html',
  styleUrls: ['./counter-app.component.css']
})
export class CounterAppComponent implements OnDestroy {
  constructor(private store:Store<AppState>){}
  counter = 0;
  
  // As it is not storing CounterState observable, it is storing only the number Observable that's why, we are
  // taking number in generic
  counter$:Observable<number> = this.store.select(getCounter);



    // counter$:Subscription = this.store.select(getCounter).subscribe((res)=>{
    //   console.log('Count Observable has been called');
    //   // this.counter = res.count;
    //   this.counter = res;
    // })

    // It is storing CounterState observable
    // counter$:Observable<counterState> = this.store.select('counter');


  ngOnDestroy(){
    // this.counter$.unsubscribe();
  }



}
