import axios from 'axios'
const articleApi = axios.create({
	baseURL: 'https://nc-news-4wkm.onrender.com/api',
})

export function getArticles() {
	return articleApi.get('/articles').then(({ data }) => {
		return data.articles
	})
}
