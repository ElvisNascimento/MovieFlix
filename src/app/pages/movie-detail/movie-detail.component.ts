import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service'; 
import { Trailer } from 'src/app/pages/movie-detail/trailer.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  constructor(private service: MovieApiServiceService, private router: ActivatedRoute,private routerService: Router) { }

  getMovieDetailResult: any;

  getMovieCastResult: any;

  getMovieTrailerResult: any;

  trailerUrl?: string;


  ngOnInit(): void {

    let getMovieId: any = this.router.snapshot.paramMap.get('id');
    this.getMovie(getMovieId);

    this.getCast(getMovieId);

    this.getVideo(getMovieId);
  }
  
  navigateBack() {
    this.routerService.navigate(['/search']);
  }

  getMovie(id: any) {
    this.service.getMovieDetail(id).subscribe((result) => {
      console.log(result, 'getmovieDetail#');
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id: any) {
    this.service.getMovieTrailer(id).subscribe((result) => {
      console.log(result, 'getTrailerResult##');
  
      if (result.results && result.results.length > 0) {
        // Tentamos encontrar o trailer oficial
        const trailerOficial = result.results.find((trailer: Trailer) => trailer.official);
  
        if (trailerOficial) {
          this.getMovieTrailerResult = `https://www.youtube.com/embed/${trailerOficial.key}`;
        } else {
          // Se não houver trailer oficial, usamos o primeiro da lista
          const videoKey = result.results[1].key;
          this.getMovieTrailerResult = `https://www.youtube.com/embed/${videoKey}`;
        }
      } else {
        // Não há vídeo disponível
        this.getMovieTrailerResult = null;
      }
    });
  }
  

  abrirVideo() {
    if (this.getMovieTrailerResult) {
      window.open(this.getMovieTrailerResult, '_parent'); // Abre em uma nova aba
    }
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'getCastResult##');
      this.getMovieCastResult = result;
    });
  }

}
