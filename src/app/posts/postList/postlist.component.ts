import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-postlist',
    templateUrl: './postlist.component.html',
    styleUrls: ['./postlist.component.scss']
})
export class PostListComponent implements OnInit {
    title: String;
    posts: any[];
    constructor() { }
    ngOnInit() {
        this.title = "Post List Component";
        this.posts = [
            { title: 'Post 1 title', tags: ['test post', 'test post 2'], category: 'Tests', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam non tellus vel finibus. Phasellus lacinia, massa a efficitur bibendum, massa mi egestas augue, ac interdum odio ipsum quis dui.' },
            { title: 'Look here', tags: ['test post', 'test post 2'], category: 'Interesting', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam non tellus vel finibus. Phasellus lacinia, massa a efficitur bibendum, massa mi egestas augue, ac interdum odio ipsum quis dui.' },
            { title: 'New Cool Thing!!!', tags: ['test post', 'test post 2'], category: 'New Tech', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam non tellus vel finibus. Phasellus lacinia, massa a efficitur bibendum, massa mi egestas augue, ac interdum odio ipsum quis dui.' },
        ]
    }
}
