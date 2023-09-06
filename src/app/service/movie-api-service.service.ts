import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http:HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "da4c2cb40d17cb988a203bc1c86336b1";

  //bannerApi
  bannerApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }

  //PopularesApi
  popularApiData():Observable<any> {
    return this.http.get(`${this.baseurl}/movie/popular?api_key=${this.apikey}`);
  }

}