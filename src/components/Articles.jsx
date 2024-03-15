import { useEffect, useState, Fragment } from 'react'
import { getArticles, getTopics } from '../api'
import Breadcrumb from './Breadcrumb'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSearchParams } from 'react-router-dom'
import Loading from './Loading'
import NotFound from './NotFound'

const crumbs = [
	{
		title: 'Articles',
		link: '',
	},
]
const sortByList = [
	{ title: 'Date', value: 'created_at' },
	{ title: 'Title', value: 'title' },
	{ title: 'Topic', value: 'topic' },
	{ title: 'Author', value: 'author' },
]
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]
const orderByList = ['desc', 'asc']
function Articles() {
	const [selectedSort, setSelectedSort] = useState(sortByList[0])
	const [selectedOrder, setSelectedOrder] = useState(orderByList[0])

	return (
		<div className="bg-white py-4">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Breadcrumb crumbs={crumbs} />
				<div className="mx-auto py-2 lg:mx-0 items-center">
					<h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 sm:text-4xl">
						Latest news
					</h2>
				</div>
				<div className="flex flex-row">
					<div className="w-1/2 px-3">
						Sort:
						<Listbox
							value={selectedSort}
							onChange={setSelectedSort}
						>
							<div className="relative mt-1">
								<Listbox.Button className="relative block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
									<span className="block truncate">
										{selectedSort.title}
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
									<Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
										{sortByList.map((item, index) => (
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
												{({ selectedSort }) => (
													<>
														<span
															className={`block truncate ${
																selectedSort
																	? 'font-medium'
																	: 'font-normal'
															}`}
														>
															{item.title}
														</span>
														{selectedSort ? (
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
					</div>
					<div className="w-1/2 px-3">
						Order:
						<Listbox
							value={selectedOrder}
							onChange={setSelectedOrder}
						>
							<div className="relative mt-1">
								<Listbox.Button className="relative block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
									<span className="block truncate">
										{selectedOrder}
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
										{orderByList.map((item, index) => (
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
												{({ selectedOrder }) => (
													<>
														<span
															className={`block truncate ${
																selectedOrder
																	? 'font-medium'
																	: 'font-normal'
															}`}
														>
															{item}
														</span>
														{selectedOrder ? (
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
					</div>
				</div>

				<ArticlesList
					selectedSort={selectedSort}
					selectedOrder={selectedOrder}
				/>
			</div>
		</div>
	)
}
function ArticlesList({ selectedSort, selectedOrder }) {
	const [articles, setArticles] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	let [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		setIsLoading(true)
		getArticles({ sort_by: selectedSort.value, order: selectedOrder })
			.then((data) => {
				setArticles(data)
				setIsLoading(false)
				setSearchParams(
					`articles\/order_by=${selectedSort.value}&order=${selectedOrder}`
				)
			})
			.catch((err) => {
				setIsError(true)
				setIsLoading(false)
			})
	}, [selectedSort, selectedOrder])
	function getFullDate(date) {
		const commentedAt = new Date(date)
		return `${commentedAt.getDate()} ${
			months[commentedAt.getMonth()]
		} ${commentedAt.getFullYear()}`
	}
	if (isLoading) {
		return <Loading />
	} else if (isError) return <NotFound />
	else
		return (
			<div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200  sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
								{getFullDate(article.created_at)}
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
export default Articles
