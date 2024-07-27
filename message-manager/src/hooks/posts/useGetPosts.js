import axios from 'axios'
import PostsService from '../../api/posts.api'
import { ref, onMounted } from 'vue'

const useGetPosts = () => {
  const posts = ref([])
  const isLoading = ref(false)

  const getPosts = async () => {
    try {
      isLoading.value = true
      const response = await PostsService.getPosts()
      posts.value = response.data
    } catch (error) {
      console.log('Error with posts api: ', error)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getPosts()
  })

  return { posts, isLoading }
}

export default useGetPosts
