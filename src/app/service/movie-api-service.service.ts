import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http:HttpClient) { }

  baseurl = environment.baseurl;
  apikey = environment.apikey;

  //bannerApi
  bannerApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }

  //PopularesApi
  popularApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/movie/popular?api_key=${this.apikey}&page=1`);
  }

  //ProximasEstreiasApi
  popularApiData2():Observable<any> {
    return this.http.get(`${this.baseurl}/movie/upcoming?api_key=${this.apikey}&page=1`);
  }

  //playing now
  nowPlayingApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/movie/now_playing?api_key=${this.apikey}`);
  }
  
  //Toprated now
  topRateApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/movie/top_rated?api_key=${this.apikey}`);
  }

  //movieDetail
  getMovieDetail(data:any):Observable<any>{
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`);
  }

  //search
  getSearchMovie(data:any):Observable<any> {
    console.log(data.gener);
    
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  //searchByGener
  getSearchByGenerMovie(data:any):Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_geners${data.gener}`);
  }

  //getCast
  getMovieCast(data:any):Observable<any>{
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`);
  }

  //getTrailer
  getMovieTrailer(data:any):Observable<any>{
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`);
  }
}
