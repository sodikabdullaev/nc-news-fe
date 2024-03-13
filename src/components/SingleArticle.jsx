import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, voteArticle } from '../api'
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
	function handleArticleVote(value) {
		voteArticle({ inc_votes: value }, article_id).then((data) => {
			setArticle(data)
		})
	}
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
					<div className="flex flex-row">
						<button
							onClick={() => {
								handleArticleVote(1)
							}}
							className="inline-flex items-center mr-2 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
						>
							UpVote{' '}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
								/>
							</svg>
							{article.votes > 0 && article.votes}
						</button>
						<button
							onClick={() => {
								handleArticleVote(-1)
							}}
							className="inline-flex items-center mr-2 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
						>
							DownVote{' '}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
								/>
							</svg>
							{article.votes < 0 && article.votes}
						</button>
					</div>
				</div>
				<Comments article_id={article_id} />
			</div>
		</div>
	)
}

export default SingleArticle
