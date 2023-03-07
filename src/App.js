import React, { createRef, useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import Summarization from './Summarization'
import Report from './Report'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Report/>} />
				<Route path="summarize" element={<Summarization/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App