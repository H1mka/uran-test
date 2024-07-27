<template>
  <div class="posts-wrapper">
    <ul v-if="!isLoading" @click="handleDeletePost($event)">
      <li v-for="post in posts" class="post-card" :key="post.id">
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
        <div class="post-actions">
          <button class="delete-btn" :data-id="post.id">Delete</button>
        </div>
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { useGetPosts } from '../../hooks'

export default {
  methods: {
    handleDeletePost(event) {
      const { target } = event
      // return if didn't click the delete button
      if (target && !target.classList.contains('delete-btn')) return
      const postId = parseInt(target.getAttribute('data-id'))
      this.posts = this.posts.filter((post) => post.id !== postId)
    },
  },
  setup() {
    const { posts, isLoading } = useGetPosts()
    return { posts, isLoading }
  },
}
</script>

<style lang="scss" scoped>
.posts-wrapper {
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .post-card {
    list-style: none;
    padding: 8px 16px;
    border: 2px solid #2c3e50;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    .post-content {
      flex-grow: 1;
    }

    .delete-btn {
      padding: 8px 12px;
      background-color: #e74c3c;
      border-color: #e74c3c;
      border-radius: 12px;
      outline: none;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #fff;
        color: #2c3e50;
      }
    }
  }
}
</style>
