import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/articles" element={<Articles />} />
				<Route
					path="/articles/:article_id"
					element={<SingleArticle />}
				/>
			</Routes>
		</>
	)
}

export default App
