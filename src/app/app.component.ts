import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  error = null;

  isFetching = true;

  constructor(private http: HttpClient, private postsService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );

    if (this.error) {
      setInterval(() => {
        this.onFetchPosts();
      }, 50000);
    } else {
      setInterval(() => {
        this.onFetchPosts();
      }, 100000);
    }
  }

  onCreatePost(postData: Post) {
    this.isFetching = true;
    this.postsService
      .createAndStorePost(postData.title, postData.content)
      .subscribe((Response) => {
        this.isFetching = false;
        this.onFetchPosts();
      },(error)=>{
        this.isFetching = false;
        this.error = error.message;
      });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    if (
      confirm(
        'After clicking ok every posts will be deleted from database too.'
      )
    ) {
      this.isFetching = true;
      this.postsService.clearPost().subscribe(() => {

      this.loadedPosts.length = 0;
        this.isFetching = false;
      },
    (error)=>{
      this.isFetching = false;
      this.error = error.message;
    }
    );
    }
  }

  onHandleError() {
    this.error = null;
  }
}
