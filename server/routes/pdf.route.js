import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { pdfDownload } from '../controllers/pdf.controller.js'

const PdfRouter = express.Router()

PdfRouter.post('/generate-pdf', isAuth, pdfDownload)

export default PdfRouter   