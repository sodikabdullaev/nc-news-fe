import ActiveUserContext from '../context/UserContext'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}
function Auth() {
	const { activeUser, setActiveUser } = useContext(ActiveUserContext)
	function handleLogout() {
		setActiveUser(null)
		localStorage.removeItem('user')
	}
	function handleLogout() {
		setActiveUser(null)
		localStorage.removeItem('user')
	}
	if (activeUser)
		return (
			<>
				<Menu as="div" className="relative ml-3">
					<div className="flex">
						<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
							<span className="absolute -inset-1.5" />
							<span className="sr-only">Open user menu</span>
							<img
								className="h-8 w-8 rounded-full"
								src={activeUser.avatar_url}
								alt=""
							/>
						</Menu.Button>
						<span className="text-white px-2 py-1">
							{activeUser.name}
						</span>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{({ active }) => (
									<button
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block px-4 w-full text-start py-2 text-sm text-gray-700'
										)}
										onClick={handleLogout}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</>
		)
	else
		return (
			<>
				<a
					href="/users"
					type="button"
					className="text-sm font-medium flex text-gray-200 hover:text-white px-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-7 h-7 -mt-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
						/>
					</svg>
					Sign in
				</a>
			</>
		)
}
export default Auth
