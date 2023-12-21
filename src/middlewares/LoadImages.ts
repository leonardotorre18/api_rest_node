import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../uploads')
})

export default multer({
  dest: path.resolve(__dirname, '../uploads'),
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB,
    files: 1
  },
  fileFilter (req, file, callback) {
    if (/png|jpg|jpeg|pneg/.test(file.mimetype)) callback(null, true)

    else callback(new Error('El archivo no es una imagen JPG o PNG'))
  }
}).single('image')

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: (req, file, cb) => {
//     const basename = path.basename(file.originalname, path.extname(file.originalname))
//     const filename = `${basename}.jpg`

//     cb(null, filename)
//   }
// })
