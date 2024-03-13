import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../api'
import Breadcrumb from './Breadcrumb'
import Comments from './Comments'

function SingleArticle() {
	const { article_id } = useParams()
	const [article, setArticle] = useState({})
	useEffect(() => {
		getArticleById(article_id).then((data) => {
			setArticle(data)
		})
	}, [article_id])
	const crumbs = [
		{
			title: 'Articles',
			link: '/articles',
		},
		{
			title: article.title,
			link: '',
		},
	]
	return (
		<div className="sm:px-32 px-4 py-4">
			<div className="mx-auto px-2">
				<Breadcrumb crumbs={crumbs} />
				<h1 className="m-2 py-2 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
					{article.title}
				</h1>
				<div>
					<img
						className="w-full rounded-md"
						src={article.article_img_url}
					/>
				</div>
				<div className="w-full py-2">
					<div className="text-base leading-7 text-gray-700 ">
						<article>{article.body}</article>
					</div>
				</div>
				<Comments article_id={article_id} />
			</div>
		</div>
	)
}

export default SingleArticle
