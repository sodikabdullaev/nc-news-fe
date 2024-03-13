import { useEffect, useState, useContext } from 'react'
import ActiveUserContext from '../context/UserContext'
import { getUsers } from '../api'
import Breadcrumb from './Breadcrumb'

const crumbs = [
	{
		title: 'Login',
		link: '',
	},
]
function Users() {
	const [users, setUsers] = useState([])
	const { setActiveUser } = useContext(ActiveUserContext)
	useEffect(() => {
		getUsers().then((data) => {
			setUsers(data)
		})
	}, [])
	function handleActAs(user) {
		setActiveUser(user)
		localStorage.setItem('user', JSON.stringify(user))
	}
	return (
		<div className="flex flex-col px-2 sm:px-32 py-2">
			<Breadcrumb crumbs={crumbs} />
			<h2 className="text-2xl text-center py-2">Login in</h2>
			<h2 className="text-mnd text-center py-1">
				No need to enter password, you can just login by clicking act as
				button
			</h2>
			<div className="-m-1.5 overflow-x-auto">
				<div className="p-1.5 min-w-full inline-block align-middle">
					<div className="border rounded-lg overflow-hidden dark:border-gray-700">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										Avatar
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										Username
									</th>
									<th
										scope="col"
										className="hidden sm:block px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								{users.map((user, index) => (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
											<img
												className="h-8 w-8 rounded-full"
												src={user.avatar_url}
												alt=""
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{user.username}
										</td>
										<td className="hidden sm:block px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
											{user.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
											<button
												type="button"
												onClick={() => {
													handleActAs(user)
												}}
												className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white bg-stone-800 px-4 py-1 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
											>
												Act as
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Users
