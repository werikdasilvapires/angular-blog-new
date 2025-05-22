import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
}

export interface GNewsResponse {
  articles: GNewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class GNewsService {
  private apiUrl = '/api/articles';
  private searchUrl = '/api/articles/search';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<GNewsResponse> {
    return this.http.get<GNewsResponse>(this.apiUrl);
  }

  searchArticles(query: string): Observable<GNewsResponse> {
    return this.http.get<GNewsResponse>(`${this.searchUrl}?q=${encodeURIComponent(query)}`);
  }
}
