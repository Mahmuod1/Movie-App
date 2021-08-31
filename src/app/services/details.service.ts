import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie ,Cast} from '../shared/movie';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http:HttpClient) { }

wishList:any=[]
wishListItems=new BehaviorSubject(this.wishList);
basicUrl='https://serene-sierra-30992.herokuapp.com/';

getVideo(mediaType:string|null,id:string|null):Observable<Movie>{

  return this.http.get<Movie>(this.basicUrl+`/details/video/${mediaType}/${id}`)

}
getTvShow(id:string|null):Observable<Movie>{

  return this.http.get<Movie>(this.basicUrl+`/details/tv-show/${id}`)
}

getVideoDetails(mediaType:string|null,id:string|null):Observable<Movie>{

  return this.http.get<Movie>(this.basicUrl+`/details/info/${mediaType}/${id}`)
}

getCastInfo(media_type:any,id:any):Observable<Cast[]>{
return this.http.get<Cast[]>(this.basicUrl+`/details/cast/${media_type}/${id}`)
}
getCastDetails(personId:any){
  return this.http.get(this.basicUrl+`/details/castdetails/${personId}`)
}
getCastExternal(personId:any){
  return this.http.get(this.basicUrl+`/details/castexternal/${personId}`)
}
}
