import React from 'react';
import { Button, Loader, TextLoader } from 'semantic-ui-react'
import "./assets/css/base.css"
import NavBar from './components/navbar';

const URL = "http://localhost:7778/summarize"

const Summarization = (props) => {
	const [document, setDocument] = React.useState('')
	const [summary, setSummary] = React.useState('')
	const [loading, setLoading] = React.useState(undefined)

	const handleChange = (event) => {
		setDocument(event.target.value)
	}

	const handleSummarize = async (event) => {
		event.preventDefault()
		setLoading(true)
		const payload = JSON.stringify({
			documents: [{ document }]
		})

		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: payload
		}
		const response = await fetch(URL, requestOptions)
		const data = await response.json()
		setSummary(data.summary)
		setLoading(false)
	}

	const render = () => {
		return (
			<div>
				<h3>Nhập văn bản</h3>
				<textarea id="w3review" name="w3review" rows="10" className="documentInput" onChange={handleChange} placeholder="Nhập văn bản của bạn vào đây"></textarea>
			</div>
		)
	}

	const renderSummary = () => {
		if (loading === undefined) return
		if (loading === true) {
			return (
				<img src="/loading.svg" alt="loading"/>
			)
		}
		if (loading === false) {
			return (
				<div>
					<div style={{marginBottom: "10px"}}>
						<h3>Kết quả tóm tắt</h3>
					</div>
					<div style={{width: "95%"}}>
						<p>{summary}</p>
					</div>
				</div>
			)
		}
	}

	return (
		<>
			<NavBar />
			<div className="container" style={{paddingTop: "15px"}}>
				{render()}
				<div style={{marginTop: "10px"}}>
					<Button primary onClick={handleSummarize}>Tóm tắt</Button>
				</div>
				<div style={{marginTop: "10px"}}></div>
				{renderSummary()}
			</div>
		</>
	)
}

export default Summarization;
