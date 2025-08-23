import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function CertificateGenerator() {
  const { currentUser } = useAuth()
  const [certificateData, setCertificateData] = useState({
    eventName: "Web Development Workshop",
    eventDate: "December 15, 2023",
    organizerName: "University Tech Club"
  })

  useEffect(() => {
    // In a real app, this would fetch the certificate data based on the user's completed events
  }, [])

  const downloadCertificate = () => {
    const certificateElement = document.getElementById('certificate')
    
    html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${currentUser?.name || 'certificate'}_${certificateData.eventName.replace(/\s+/g, '_')}.pdf`)
    })
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Certificate of Participation</h1>
            <button 
              onClick={downloadCertificate}
              className="btn btn-primary flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div id="certificate" className="certificate bg-gradient-to-br from-blue-50 to-indigo-100 border-8 border-double border-gray-800 p-12 text-center">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Certificate of Participation</h1>
                <div className="w-32 h-1 bg-indigo-600 mx-auto"></div>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">This is to certify that</p>
              
              <h2 className="text-3xl font-bold text-indigo-700 mb-6 underline decoration-indigo-500 decoration-2">
                {currentUser?.name || "John Doe"}
              </h2>
              
              <p className="text-lg text-gray-600 mb-2">has successfully participated in</p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {certificateData.eventName}
              </h3>
              
              <p className="text-lg text-gray-600 mb-2">held on</p>
              
              <p className="text-xl font-semibold text-gray-700 mb-8">
                {certificateData.eventDate}
              </p>
              
              <div className="flex justify-between items-end mt-16">
                <div>
                  <div className="w-48 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">Event Coordinator</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-indigo-600 flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-indigo-600">E</span>
                  </div>
                  <p className="text-sm text-gray-600">University Seal</p>
                </div>
                <div>
                  <div className="w-48 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">Date of Issue: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificate Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Event Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={certificateData.eventName}
                  onChange={(e) => setCertificateData({...certificateData, eventName: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Event Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={certificateData.eventDate}
                  onChange={(e) => setCertificateData({...certificateData, eventDate: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Organizer</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={certificateData.organizerName}
                  onChange={(e) => setCertificateData({...certificateData, organizerName: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">Recipient</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={currentUser?.name || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateGenerator