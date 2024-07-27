import axios from 'axios'

const PostsService = {
  getPosts: async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/posts')
  },
}

export default PostsService
