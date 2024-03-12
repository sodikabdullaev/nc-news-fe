import { useEffect, useState } from 'react'
import { getArticles } from '../api'

function Articles() {
	const [articles, setArticles] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		getArticles().then((data) => {
			setArticles(data)
		})
	}, [])
	return (
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto py-2 lg:mx-0 items-center">
					<h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
						Latest news
					</h2>
				</div>
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="search"
						value={searchTerm}
						onChange={(event) => {
							setSearchTerm(event.target.value)
						}}
						id="default-search"
						className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Search item"
						required
					/>
					<button
						type="button"
						className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 md:px-10 py-2"
					>
						Search
					</button>
				</div>

				<div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{articles.map((article) => (
						<article
							key={article.article_id}
							className="flex max-w-xl flex-col items-start justify-between"
						>
							{' '}
							<div className="items-center">
								<img
									className="rounded-lg"
									src={article.article_img_url}
								/>
							</div>
							<div className="flex items-center gap-x-4 text-xs">
								<time
									dateTime={article.created_at}
									className="text-gray-500"
								>
									{article.created_at}
								</time>
								<a
									href={article.topic}
									className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
								>
									{article.topic}
								</a>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<a href="#">
										<span className="absolute inset-0" />
										{article.title}
									</a>
								</h3>
								<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
									description
								</p>
							</div>
							<div className="relative mt-8 flex items-center gap-x-4">
								{/* <img
									src={post.author.imageUrl}
									alt=""
									className="h-10 w-10 rounded-full bg-gray-50"
								/>
								<div className="text-sm leading-6">
									<p className="font-semibold text-gray-900">
										<a href={post.author.href}>
											<span className="absolute inset-0" />
											{post.author.name}
										</a>
									</p>
									<p className="text-gray-600">
										{post.author.role}
									</p>
								</div> */}
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}
export default Articles
