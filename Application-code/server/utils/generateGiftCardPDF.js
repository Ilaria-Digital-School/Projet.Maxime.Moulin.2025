const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateGiftCardPDF({ duration, fromName, toName }) {
  const templatePath = path.join(__dirname, '../templates/carte-cadeau-modele.pdf');
  const existingPdfBytes = fs.readFileSync(templatePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 14;
  const endDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');
  const { height } = page.getSize();

  page.drawText(duration, {
    x: 275,
    y: height - 147,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(toName, {
    x: 125,
    y: height - 195,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(fromName, {
    x: 165,
    y: height - 222,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(endDate, {
    x: 185,
    y: height - 248,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes); // Return the PDF as a Buffer
}

module.exports = generateGiftCardPDF;