import app from './app'
import { AppDataSource } from './data-source'
import 'dotenv/config'


AppDataSource.initialize().then(() => {
    console.log('Database connected.')
    app.listen(process.env.PORT, () => {
        console.log('Server is running.')
    })
}).catch(err => {
    console.log(err)
})