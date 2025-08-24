const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCertificate(userName, eventName, eventDate) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape'
    });

    const certificatesDir = path.join(__dirname, '../certificates');
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true });
    }

    const filePath = path.join(
      certificatesDir,
      `${userName.replace(/\s+/g, '_')}_${eventName.replace(/\s+/g, '_')}.pdf`
    );

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add border
    doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

    // Title
    doc.fontSize(30).text('Certificate of Participation', { align: 'center' });

    // Body
    doc.moveDown(2);
    doc.fontSize(16).text('This is to certify that', { align: 'center' });
    doc.fontSize(20).text(userName, { align: 'center' });
    doc.fontSize(16).text('has successfully participated in', { align: 'center' });
    doc.fontSize(20).text(eventName, { align: 'center' });
    doc.fontSize(16).text(`held on ${eventDate}`, { align: 'center' });

    // Date of issue
    doc.moveDown(2);
    doc.fontSize(12).text(`Issued on: ${new Date().toLocaleDateString()}`, { align: 'center' });

    // Signatures
    doc.fontSize(14).text('Event Coordinator', 150, doc.page.height - 100);
    doc.fontSize(14).text('University Seal', doc.page.width - 250, doc.page.height - 100);

    doc.end();

    stream.on('finish', () => {
      resolve(filePath);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = generateCertificate;
