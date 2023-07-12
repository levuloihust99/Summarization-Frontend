import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import "./assets/css/base.css"

const backendURL = "http://103.252.1.223:7778/report"

const Report = () => {
    const [report, setReport] = React.useState(undefined)
    const [selectedFile, setSelectedFile] = React.useState(undefined)

    const renderReport = () => {
        if (report === undefined) return
        const reportParagraphs = report.split("\n")

        return (
            <div>
                <div style={{marginBottom: "10px"}}>
                    <h3>Mẫu báo cáo</h3>
                </div>
                <div style={{width: "95%"}}>
                    {
                        reportParagraphs.map((para) => {
                            return <p>{para}</p>
                        })
                    }
                </div>
            </div>
        )
    }

    const handleUpload = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const createReport = async () => {
        const fileContent = await new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = reject
            fileReader.readAsArrayBuffer(selectedFile)
        })

		const requestOptions = {
			method: 'POST',
			body: fileContent
		}
        
        let response = undefined
        try {
            response = await fetch(backendURL, requestOptions)
        } catch (err) {
            console.log(err)
        }
        const generatedReport = await response.text()
        setReport(generatedReport)
    }

    const renderUploadArea = () => {
        return (
            <>
                <div style={{marginBottom: "10px", marginTop: "15px"}}>
                    <h3>Tải lên file excel</h3>
                </div>
                <Input 
                    type="file"
                    onChange={handleUpload}
                />
				<div style={{marginTop: "10px", marginBottom: "15px"}}>
					{/* <Button primary onClick={createReport}>Tạo báo cáo</Button> */}
                    <Button icon primary><Icon name="edit"/></Button>
				</div>
            </>
        )
    }

    React.useEffect(() => {
        window.selectedFile = selectedFile
    }, [selectedFile])

    return (
        <div className="container">
            {renderUploadArea()}
            {renderReport()}
        </div>
    )
}

export default Report