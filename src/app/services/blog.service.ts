import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  photoCover: string;
  category?: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  date: Date;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private comments: Comment[] = [
    {id: '1', postId: '1', author: 'Maria Silva', text: 'Adorei este artigo! Mal posso esperar pelo novo filme.', date: new Date('2023-10-15')},
    {id: '2', postId: '1', author: 'João Oliveira', text: 'O Robert Downey Jr. é realmente incrível como Homem de Ferro.', date: new Date('2023-10-16')},
    {id: '3', postId: '2', author: 'Ana Costa', text: 'Quais séries serão lançadas? Estou ansiosa!', date: new Date('2023-10-14')},
    {id: '4', postId: '3', author: 'Pedro Santos', text: 'Wakanda Forever foi incrível! Espero que a sequência seja ainda melhor.', date: new Date('2023-10-12')}
  ];
  
  constructor() { }
  
  // Método original para obter todos os posts
  getAllPosts(): Observable<BlogPost[]> {
    return of([]);
  }
  
  // Novo método com paginação
  getPostsPaginated(page: number = 1, pageSize: number = 4): Observable<PaginatedResult<BlogPost>> {
    return of({
      items: [],
      totalItems: 0,
      currentPage: page,
      pageSize: pageSize,
      totalPages: 0
    });
  }
  
  getPostById(id: string): Observable<BlogPost | undefined> {
    return of(undefined);
  }
  
  getPostsByCategory(category: string, page: number = 1, pageSize: number = 4): Observable<PaginatedResult<BlogPost>> {
    return of({
      items: [],
      totalItems: 0,
      currentPage: page,
      pageSize: pageSize,
      totalPages: 0
    });
  }
  
  getCategories(): Observable<string[]> {
    return of([]);
  }
  
  // Método para busca
  searchPosts(query: string, page: number = 1, pageSize: number = 4): Observable<PaginatedResult<BlogPost>> {
    return of({
      items: [],
      totalItems: 0,
      currentPage: page,
      pageSize: pageSize,
      totalPages: 0
    });
  }
  
  // Métodos para gerenciamento de comentários
  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return of(this.comments.filter(comment => comment.postId === postId));
  }
  
  addComment(comment: Omit<Comment, 'id' | 'date'>): Observable<Comment> {
    const newComment: Comment = {
      ...comment,
      id: (this.comments.length + 1).toString(),
      date: new Date()
    };
    
    this.comments.push(newComment);
    return of(newComment);
  }
}
