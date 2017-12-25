import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
	state = {
		load_post : null
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.state.load_post && (nextProps.id === this.state.load_post.id)){
			console.log('早就oading 過了，不loading');
			return false;
		}
		return true;
	}
	componentDidUpdate(){
		console.log('componentDidUpdate');
		if(this.props.id){
			if(!this.state.load_post || 
					(this.state.load_post && (this.props.id !== this.state.load_post.id))
				){

				axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
				.then(response=>{
					// console.log('response.data',response.data);
					this.setState({load_post: response.data})
				})
			}
		}
	}
	render() {
		let post = <p>Please select a Post!</p>;
		
		if(this.props.id){
			post = <strong> 載入中.... </strong>;
		}
		if (this.state.load_post ) {
			post = (
				<div className="FullPost">
					<h1>{this.state.load_post.title}</h1>
					<p>{this.state.load_post.body}</p>
					<div className="Edit">
						<button className="Delete">Delete</button>
					</div>
				</div>

			);
		}

		return post;
	}
}

export default FullPost;