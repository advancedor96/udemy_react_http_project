import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
	state = {
		posts :[],
		selectedId: null
	}
	componentDidMount(){
		axios.get('https://jsonplaceholder.typicode.com/posts')
		.then((response)=>{
			const posts = response.data.slice(0,4);
			const updatePosts = posts.map((post)=>{
				return {...post, author: 'Max'}
			});

			this.setState({
				posts: updatePosts
			});
		})
	}
	onSelectPostHandler = (id)=>{
		this.setState({
			selectedId: id
		});
	}
    render () {
		 const post_lsit = this.state.posts.map((post)=>{
			 return <Post
							 key={post.id} 
							 title={post.title} 
							 author={post.author} 
							 click={()=>{this.onSelectPostHandler(post.id)}}/>
		 });
        return (
            <div>
                <section className="Posts">
						{post_lsit}
                </section>
                <section>
                    <FullPost id={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;