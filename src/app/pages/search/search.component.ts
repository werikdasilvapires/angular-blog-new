import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GNewsService, GNewsArticle, GNewsResponse } from '../../services/gnews.service';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MenuTitleComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  gnewsArticles: GNewsArticle[] = [];

  constructor(
    private route: ActivatedRoute,
    private gnewsService: GNewsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });
  }

  performSearch(): void {
    if (this.searchQuery) {
      this.gnewsService.searchArticles(this.searchQuery)
        .subscribe((res: GNewsResponse) => {
          this.gnewsArticles = res.articles;
        });
    } else {
      this.gnewsService.getArticles()
        .subscribe((res: GNewsResponse) => {
          this.gnewsArticles = res.articles;
        });
    }
  }
}
