import axios from 'axios'
const newsApi = axios.create({
	baseURL: 'https://nc-news-4wkm.onrender.com/api',
})

export function getArticles(queries) {
	return newsApi.get('/articles', { params: queries }).then(({ data }) => {
		return data.articles
	})
}
export function getArticleById(article_id) {
	return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
		return data.article
	})
}
export function getComments(article_id) {
	return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
		return data.comments
	})
}
export function voteArticle(body, article_id) {
	return newsApi.patch(`/articles/${article_id}`, body).then(({ data }) => {
		return data.article
	})
}
export function getUsers() {
	return newsApi.get('/users').then(({ data }) => {
		return data.users
	})
}
export function addComment(article_id, comment) {
	return newsApi
		.post(`/articles/${article_id}/comments`, comment)
		.then(({ data }) => {
			return data.comment
		})
}
export function deleteComment(comment_id) {
	return newsApi.delete(`/comments/${comment_id}`).then(() => {
		return true
	})
}
export function getTopics() {
	return newsApi.get('/topics').then(({ data }) => {
		return data.topics
	})
}
