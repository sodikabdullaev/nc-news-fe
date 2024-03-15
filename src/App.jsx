import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import ActiveUserContext from './context/UserContext'
import { useState } from 'react'
import Users from './components/Users'
import NotFound from './components/NotFound'
import ArticlesByTopic from './components/ArticlesByTopic'
function App() {
	const [activeUser, setActiveUser] = useState(
		JSON.parse(localStorage.getItem('user'))
	)
	return (
		<>
			<ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
				<Header />
				<Routes>
					<Route path="/" element={<Articles />} />
					<Route path="/articles" element={<Articles />} />
					<Route
						path="/topics/:topic"
						element={<ArticlesByTopic />}
					/>
					<Route path="/topics" element={<ArticlesByTopic />} />
					<Route
						path="/articles/:article_id"
						element={<SingleArticle />}
					/>
					<Route path="/users" element={<Users />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</ActiveUserContext.Provider>
		</>
	)
}

export default App
