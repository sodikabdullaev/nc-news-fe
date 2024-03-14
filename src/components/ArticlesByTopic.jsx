import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { getArticles, getTopics } from '../api'
import Breadcrumb from './Breadcrumb'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function ArticlesByTopic() {
	const [selected, setSelected] = useState('')
	const [topics, setTopics] = useState([])
	const { topic } = useParams()
	useEffect(() => {
		getTopics().then((data) => {
			setTopics(data)
			console.log(data.find((item) => item.slug === topic))
			setSelected(data.find((item) => item.slug === topic))
		})
	}, [])
	const crumbs = [
		{
			title: 'Articles',
			link: '/articles',
		},
		{
			title: selected.slug,
			link: `/articles/${selected.slug}`,
		},
	]
	return (
		<div className="bg-white py-4">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Breadcrumb crumbs={crumbs} />
				<div className="mx-auto py-2 lg:mx-0 items-center">
					<h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
						{selected.description}
					</h2>
				</div>

				<Listbox value={selected} onChange={setSelected}>
					<div className="relative mt-1">
						<Listbox.Button className="relative block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">
								{`${selected.description} (${selected.slug})`}
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
								{topics.map((item, index) => (
									<Listbox.Option
										key={index}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? 'bg-amber-100 text-amber-900'
													: 'text-gray-900'
											}`
										}
										value={item}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected
															? 'font-medium'
															: 'font-normal'
													}`}
												>
													{`${item.description} (${item.slug})`}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
				<ArticlesList selected={selected} />
			</div>
		</div>
	)
}
function ArticlesList({ selected }) {
	const [articles, setArticles] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getArticles({ topic: selected.slug }).then((data) => {
			setArticles(data)
			setIsLoading(false)
		})
	}, [selected])
	return (
		<div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
			{isLoading && <Loading />}
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
							href={`/topics/${article.topic}`}
							className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
						>
							{article.topic}
						</a>
					</div>
					<div className="group relative">
						<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
							<a href={`/articles/${article.article_id}`}>
								<span className="absolute inset-0" />
								{article.title}
							</a>
						</h3>
						<p className="text-gray-600">
							Author: <a href="#">{article.author}</a>
						</p>
					</div>
				</article>
			))}
		</div>
	)
}
function Loading() {
	return <h2>🌀 Loading...</h2>
}
export default ArticlesByTopic
