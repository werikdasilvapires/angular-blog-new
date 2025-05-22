import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost, PaginatedResult } from '../../services/blog.service';
import { MenuTitleComponent } from '../../components/menu-title/menu-title.component';
import { BigCardComponent } from '../../components/big-card/big-card.component';
import { SmallCardComponent } from '../../components/small-card/small-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MenuTitleComponent, BigCardComponent, SmallCardComponent, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  posts: BlogPost[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 4;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || '';
      this.currentPage = 1; // Reset para primeira página
      this.loadCategoryPosts();
    });
  }
  
  loadCategoryPosts(): void {
    this.blogService.getPostsByCategory(this.categoryName, this.currentPage, this.pageSize)
      .subscribe((result: PaginatedResult<BlogPost>) => {
        this.posts = result.items;
        this.currentPage = result.currentPage;
        this.totalPages = result.totalPages;
      });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCategoryPosts();
  }
}
