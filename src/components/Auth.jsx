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
									<a
										href="#"
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700'
										)}
									>
										Your Profile
									</a>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<a
										href="#"
										className={classNames(
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700'
										)}
									>
										Settings
									</a>
								)}
							</Menu.Item>
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
					className="text-sm font-medium  text-gray-200 hover:text-white px-2"
				>
					Sign in
				</a>
				<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
				<a
					href="#"
					className="text-sm font-medium text-gray-200 hover:text-white px-2"
				>
					Create account
				</a>
			</>
		)
}
export default Auth
