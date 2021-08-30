import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMedia,Results } from './../shared/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
getSearchResults(query:any):Observable<Results[]>{
    return this.http.get<Results[]>(`http://localhost:8080/home/multisearch/${query}`)
  }
  getCurrentPlayingMovies () {
    let URL = "http://localhost:8080/home/currentPlayingMovies";
    return this.http.get(URL);
  }

  getPopularMovies ():Observable<IMedia> {
    let URL = "http://localhost:8080/home/popularMovies";
    return this.http.get<IMedia>(URL);
  }

  getTopRatedMovies ():Observable<IMedia> {
    let URL = "http://localhost:8080/home/topRatedMovies";
    return this.http.get<IMedia>(URL);
  }

  getTrendingMovies ():Observable<IMedia> {
    let URL = "http://localhost:8080/home/trendingMovies";
    return this.http.get<IMedia>(URL);
  }

  getPopularShows () {
    let URL = "http://localhost:8080/home/popularShows";
    return this.http.get(URL);
  }

  getTopRatedShows ():Observable<IMedia> {
    let URL = "http://localhost:8080/home/topRatedShows";
    return this.http.get<IMedia>(URL);
  }

  getTrendingShows ():Observable<IMedia> {
    let URL = "http://localhost:8080/home/trendingShows";
    return this.http.get<IMedia>(URL);
  }




}
