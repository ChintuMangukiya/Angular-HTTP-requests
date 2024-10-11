import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] =[];

  error = null;

  isFetching = true;

  constructor(private http: HttpClient, private postsService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });

    if(this.error)
    {
  setInterval(() => {
    this.onFetchPosts();
  }, 5000);
}
else{
  setInterval(() => {
    this.onFetchPosts();
  }, 10000);
}
  }

  
  onCreatePost(postData: Post) {

    this.isFetching = true;
    this.postsService.createAndStorePost( postData.title, postData.content).subscribe(Response => {
      this.isFetching = false;
      this.onFetchPosts();
    }); 
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.loadedPosts = [];
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {

    this.isFetching = true;
    this.postsService.clearPost().subscribe((data)=>{
      this.loadedPosts.length = 0;
      this.isFetching = false;
    });
  }
}
