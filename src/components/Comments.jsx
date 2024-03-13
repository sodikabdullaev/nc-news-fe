import { useEffect, useState } from 'react'
import { getComments } from '../api'
function Comments({ article_id }) {
	const [comments, setComments] = useState([])
	useEffect(() => {
		getComments(article_id).then((data) => {
			setComments(data)
		})
	}, [])
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
	function getFullDate(date) {
		const commentedAt = new Date(date)
		return `${commentedAt.getDate()} ${
			months[commentedAt.getMonth()]
		} ${commentedAt.getFullYear()}`
	}
	return (
		<>
			<h2>Comments</h2>
			<form className=" bg-white rounded-2xl border border-blue-500 p-2 mx-auto mt-20 ">
				<div className="px-3 mb-2 mt-2">
					<textarea
						placeholder="comment"
						className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
					></textarea>
				</div>
				<div className="flex justify-end px-4">
					<input
						type="submit"
						className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
						value="Comment"
					/>
				</div>
			</form>
			<ul>
				{comments.map((comment, index) => (
					<li
						key={index}
						className="bg-stone-100 mb-2 mt-2 p-2 rounded-b-3xl rounded-tr-3xl border border-blue-300"
					>
						<div className="grid grid-cols-6">
							<div className="px-2 sm:col-span-1 borde">
								<div className="flex flex-row">
									<img
										className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<div className="px-2">
										<p className="text-gray-700">
											{comment.author}
										</p>
									</div>
								</div>
							</div>
							<div className="col-span-6 sm:col-span-5">
								<p>{comment.body}</p>
								<button className="inline-flex items-center mr-2 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									Upvote 👍{' '}
									{comment.votes > 0 && comment.votes}
								</button>
								<button className="inline-flex items-center mr-2 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
									DownVote 👎
									{comment.votes < 0 && comment.votes}
								</button>
								<span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
									{getFullDate(comment.created_at)}
								</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
export default Comments
