import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function CertificateGenerator() {
  const { currentUser } = useAuth()
  const [certificateData, setCertificateData] = useState({
    eventName: "The Event Organized by Eventify",
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
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.maxWidth}>
          <div style={styles.header}>
            <h1 style={styles.title}>Certificate of Participation</h1>
            <button 
              onClick={downloadCertificate}
              style={styles.downloadButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.downloadIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
          
          <div style={styles.certificateContainer}>
            <div id="certificate" style={styles.certificate}>
              <div style={styles.certificateHeader}>
                <h1 style={styles.certificateTitle}>Certificate of Participation</h1>
                <div style={styles.titleUnderline}></div>
              </div>
              
              <p style={styles.certificateText}>This is to certify that</p>
              
              <h2 style={styles.userName}>
                {currentUser?.name || "John Doe"}
              </h2>
              
              <p style={styles.certificateText}>has successfully participated in</p>
              
              <h3 style={styles.eventName}>
                {certificateData.eventName}
              </h3>
              
              <p style={styles.certificateText}>held on</p>
              
              <p style={styles.eventDate}>
                {certificateData.eventDate}
              </p>
              
              <div style={styles.footer}>
                <div style={styles.signature}>
                  <div style={styles.signatureLine}></div>
                  <p style={styles.signatureLabel}>Event Coordinator</p>
                </div>
                <div style={styles.sealContainer}>
                  <div style={styles.seal}>
                    <span style={styles.sealText}>E</span>
                  </div>
                  <p style={styles.sealLabel}>University Seal</p>
                </div>
                <div style={styles.signature}>
                  <div style={styles.signatureLine}></div>
                  <p style={styles.signatureLabel}>Date of Issue: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// CSS Styles
const styles = {
  page: {
    padding: '2rem 0'
  },
  container: {
    width: '100%',
    padding: '0 1rem',
    margin: '0 auto'
  },
  maxWidth: {
    maxWidth: '56rem',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#374151'
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  downloadIcon: {
    height: '1.25rem',
    width: '1.25rem',
    marginRight: '0.5rem'
  },
  certificateContainer: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '2rem'
  },
  certificate: {
    background: 'linear-gradient(to bottom right, #ebf4ff, #c3dafe)',
    border: '8px double #374151',
    padding: '3rem',
    textAlign: 'center'
  },
  certificateHeader: {
    marginBottom: '1.5rem'
  },
  certificateTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  titleUnderline: {
    width: '8rem',
    height: '0.125rem',
    backgroundColor: '#4f46e5',
    margin: '0 auto'
  },
  certificateText: {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '1.5rem'
  },
  userName: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: '1.5rem',
    textDecoration: 'underline',
    textDecorationColor: '#4f46e5',
    textDecorationThickness: '2px'
  },
  eventName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '1.5rem'
  },
  eventDate: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '2rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '4rem'
  },
  signature: {
    flex: '1'
  },
  signatureLine: {
    width: '12rem',
    height: '1px',
    backgroundColor: '#9ca3af',
    marginBottom: '0.5rem'
  },
  signatureLabel: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  sealContainer: {
    textAlign: 'center'
  },
  seal: {
    width: '6rem',
    height: '6rem',
    borderRadius: '50%',
    border: '4px solid #4f46e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 0.5rem'
  },
  sealText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4f46e5'
  },
  sealLabel: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  infoContainer: {
    marginTop: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '1.5rem'
  },
  infoTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  inputLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem'
  }
}

export default CertificateGenerator