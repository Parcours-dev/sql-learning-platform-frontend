<template>
  <div class="news-container">
    <div v-if="newsItems.length" class="news-item">
      <h3><a :href="newsItems[0].link" target="_blank">{{ newsItems[0].title }}</a></h3>
      <div class="content-snippet" v-html="newsItems[0].contentSnippet"></div>
      <p class="news-date">{{ formatDate(newsItems[0].pubDate) }}</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import DOMPurify from 'dompurify';

const newsItems = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/news');
    newsItems.value = response.data.map(article => {
      return {
        ...article,
        contentSnippet: DOMPurify.sanitize(article.contentSnippet) // Purify the HTML content
      };
    }).slice(0, 1); // Only take the first article
  } catch (error) {
    console.error("Error fetching news:", error);
  }
});

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<style scoped>
.news-container {
  display: flex;
  flex-direction: column;
  max-height: 300px; /* Limit height */
  overflow: hidden; /* Hide overflow */
}

.news-item {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.news-item h3 {
  margin: 0 0 10px 0;
}

.content-snippet {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 100px; /* Limit content height */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Show max 3 lines */
}

.news-item p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.news-item .news-date {
  font-style: italic;
  color: #333;
}

.news-item .read-more {
  display: inline-block;
  margin-top: 10px;
  color: #007BFF;
  text-decoration: none;
  position: absolute;
  bottom: 20px;
}

.news-item .read-more:hover {
  text-decoration: underline;
}
</style>
