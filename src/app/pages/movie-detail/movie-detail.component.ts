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

  videUrl: any;


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
      const videoUrl = this.getMovieTrailerResult + '?autoplay=1'; // Adicionando o parâmetro autoplay

      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '335';
      iframe.src = videoUrl;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      const container = document.getElementById('containerVideo');

      if (container !== null) {
        container.innerHTML = '';
        container.appendChild(iframe);
      } else {
        console.error('Elemento com o ID especificado não foi encontrado.');
      }
    }
  }


  getStars(voteAverage: number): number[] {
    return Array.from({ length: 10 }, (_, index) => index);
  }
  getRoundedVoteAverage(): number {
    return Math.floor(this.getMovieDetailResult.vote_average);
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'getCastResult##');
      this.getMovieCastResult = result;
    });
  }

}
