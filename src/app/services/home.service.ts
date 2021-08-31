import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMedia,Results } from './../shared/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  basicUrl='https://serene-sierra-30992.herokuapp.com';
getSearchResults(query:any):Observable<Results[]>{
    return this.http.get<Results[]>(`${this.basicUrl}/home/multisearch/${query}`)
  }
  getCurrentPlayingMovies () {
    let URL = this.basicUrl+"/home/currentPlayingMovies";
    return this.http.get(URL);
  }

  getPopularMovies ():Observable<IMedia> {
    let URL = this.basicUrl+"home/popularMovies";
    return this.http.get<IMedia>(URL);
  }

  getTopRatedMovies ():Observable<IMedia> {
    let URL = this.basicUrl+"/home/topRatedMovies";
    return this.http.get<IMedia>(URL);
  }

  getTrendingMovies ():Observable<IMedia> {
    let URL = this.basicUrl+"/home/trendingMovies";
    return this.http.get<IMedia>(URL);
  }

  getPopularShows () {
    let URL = this.basicUrl+"home/popularShows";
    return this.http.get(URL);
  }

  getTopRatedShows ():Observable<IMedia> {
    let URL = this.basicUrl+"/home/topRatedShows";
    return this.http.get<IMedia>(URL);
  }

  getTrendingShows ():Observable<IMedia> {
    let URL = this.basicUrl+"/home/trendingShows";
    return this.http.get<IMedia>(URL);
  }




}
