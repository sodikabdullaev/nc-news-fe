import { useEffect, useState, useContext, Fragment } from 'react'
import { addComment, deleteComment, getComments } from '../api'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import ActiveUserContext from '../context/UserContext'
function Comments({ article_id }) {
	const [comments, setComments] = useState([])
	const [newComment, setNewComment] = useState('')
	const [isLoading, setIsloading] = useState(true)
	const [isCommenting, setIsCommenting] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const { activeUser } = useContext(ActiveUserContext)
	const [commmentToDelete, setCommmentToDelete] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState([])

	function closeModal() {
		setIsOpen(false)
	}

	function openModal() {
		setIsOpen(true)
	}
	useEffect(() => {
		getComments(article_id).then((data) => {
			setComments(data)
			setIsloading(false)
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
	function handleSubmit(event) {
		event.preventDefault()
		setIsCommenting(true)
		if (activeUser) {
			if (newComment.length >= 5) {
				addComment(article_id, {
					body: newComment,
					author: activeUser.username,
				})
					.then((data) => {
						setComments((currValue) => {
							return [data, ...currValue]
						})
						setIsCommenting(false)
						setNewComment('')
						setErrors([])
					})
					.catch((err) => {
						setErrors[err.msg]
					})
			} else
				setErrors([
					`Please enter at least 5 characters to leave a comment`,
				])
			setIsCommenting(false)
		} else {
			setErrors([`You need to login to leave a comment`])
			setIsCommenting(false)
		}
	}
	function handleDeleteComment() {
		setIsDeleting(true)
		deleteComment(commmentToDelete).then(() => {
			setComments((currValue) => {
				return currValue.filter(
					(comment) => comment.comment_id != commmentToDelete
				)
			})
			closeModal()
			setIsDeleting(false)
		})
	}
	function getFullDate(date) {
		const commentedAt = new Date(date)
		return `${commentedAt.getDate()} ${
			months[commentedAt.getMonth()]
		} ${commentedAt.getFullYear()}`
	}
	return (
		<>
			<h2>Comments</h2>
			{isLoading && 'Loading ...'}
			<form className=" bg-white rounded-2xl border border-blue-500 p-2 mx-auto mt-20 ">
				{errors.map((error, index) => (
					<p
						key={index}
						className="bg-red-50 py-1 px-2 rounded-md text-red-700"
					>
						{error}
					</p>
				))}
				<div className="px-3 mb-2 mt-2">
					<textarea
						placeholder="your comment"
						required
						value={newComment}
						onChange={(event) => setNewComment(event.target.value)}
						className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
					></textarea>
				</div>
				<div className="flex justify-end px-4">
					<button
						className={clsx(
							(newComment.length < 5 || isCommenting === true) &&
								'cursor-not-allowed opacity-50',
							'px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500'
						)}
						onClick={handleSubmit}
					>
						{isCommenting ? 'Commenting ... ' : 'Comment'}
					</button>
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
								<button className="inline-flex items-center mr-2 mb-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									{getFullDate(comment.created_at)}
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
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
										/>
									</svg>
								</button>
								<button className="inline-flex items-center mr-2 mb-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									Upvote{' '}
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
									{comment.votes > 0 && comment.votes}
								</button>
								<button className="inline-flex items-center mr-2 mb-1 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
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
									{comment.votes < 0 && comment.votes}
								</button>
								{activeUser &&
									comment.author === activeUser.username && (
										<button
											type="button"
											onClick={() => {
												setCommmentToDelete(
													comment.comment_id
												)
												openModal()
											}}
											className="inline-flex items-center mr-2 mb-1 rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"
										>
											Delete
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
													d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
												/>
											</svg>
										</button>
									)}
							</div>
						</div>
					</li>
				))}
			</ul>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Confirm action
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Are you sure you want to delete the
											comment?
										</p>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex  justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Cancel
										</button>
										<button
											type="button"
											className="inline-flex ml-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={handleDeleteComment}
										>
											{isDeleting
												? 'Deleting...'
												: 'Delete'}
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
export default Comments
