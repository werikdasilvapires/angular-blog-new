import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, SearchBarComponent],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  categories: string[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
