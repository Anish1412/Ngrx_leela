import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../Store/counter.state';
import { changeTitle, customIncrement } from 'src/app/counter/Store/counter.actions';
import { getChangeTitle } from '../Store/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';

@Component({
  selector: 'app-custom-input-increment',
  templateUrl: './custom-input-increment.component.html',
  styleUrls: ['./custom-input-increment.component.css']
})
export class CustomInputIncrementComponent implements OnInit{
  constructor(private store:Store<AppState>) {}

  value:any;
  // changetitle:any;
  // changetitle$;

  addValue(){
    // Converted string into number using "+" operator with string value
    this.store.dispatch(customIncrement({ value : +this.value }));
    // console.log(this.value);
  }

    changetitle$:Observable<string> = this.store.select(getChangeTitle);

  changeTitle(){
    this.store.dispatch(changeTitle());

  }

  ngOnInit(): void {
      // this.store.select('counter').subscribe((data)=>{
      //   console.log('ChangeName Observable has been called');
      //   this.changetitle = data.changeTitle;
      // })

      // this.store.select(getChangeTitle).subscribe((data)=>{
      //   console.log('ChangeName Observable has been called');
      //   this.changetitle = data;
      // })

      
  }
}
