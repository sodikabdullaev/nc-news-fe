import axios from 'axios'
const newsApi = axios.create({
	baseURL: 'https://nc-news-4wkm.onrender.com/api',
})

export function getArticles() {
	return newsApi.get('/articles').then(({ data }) => {
		return data.articles
	})
}
export function getArticleById(article_id) {
	return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
		return data.article
	})
}
