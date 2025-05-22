import { Component, OnInit } from '@angular/core';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GNewsService, GNewsArticle, GNewsResponse } from '../../services/gnews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuTitleComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: GNewsArticle[] = [];

  constructor(private gnewsService: GNewsService) { }

  ngOnInit(): void {
    this.gnewsService.getArticles().subscribe((res: GNewsResponse) => {
      this.articles = res.articles;
    });
  }
}
