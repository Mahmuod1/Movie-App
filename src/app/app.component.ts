import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {noop, Observable, Observer, of, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, catchError,map,tap} from 'rxjs/operators';
import { HomeService } from './services/home.service';
import { Results } from './shared/movie';
import { Router, ActivatedRoute } from '@angular/router';


const states = [{name:'ali',age:12},{name:'mahmuoud',age:22}];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

public results:Results[]=[]
  public isMenuCollapsed = true;
  constructor(private homeService:HomeService) {}
  public model: any;
  ngOnInit(): void {

}

// getSearchResults(value:any):Results[]{
//   this.homeService.getSearchResults(value.target.value).subscribe(result=>{
//    this.results=result
//    console.log(this.results)
//   })
// return this.results
// }
/* this is the typehaed functions that first get the input text from the search input and
make a request to the server to get the search results and use switch map to handle the
array of object that come from response of the server
and not send the request immediately just wait 200 milliseconds after stop typying in the search input
*/
search = (text$: Observable<string>) => {

  return text$ && text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array

      switchMap( (searchText) =>  {
        return searchText ? this.homeService.getSearchResults(searchText):[]
      } ),

  );
}



inputFormatBandListValue(value: any)   {

    return value.title
    return value
}

}
