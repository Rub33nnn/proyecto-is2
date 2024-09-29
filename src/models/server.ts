import express, {Application, Request, Response} from 'express'
import routesUser from '../routes/user'
import db from '../DB/connectiondb'
import cors from 'cors'
//Estas son las configuraciones para el server, la neta no recuerdo bien como funcionaba xD

class Server{
    private app: Application
    private port:string

    constructor(){
        this.app = express()
        this.port  = process.env.PORT || '3306'
        this.listen()
        this.midlewares()
        this.routes()
        this.dbconnecct()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Aplicacion corriendo en el puerto", this.port)
        })
    }

    routes(){
        this.app.get('/',(req: Request, res:Response) =>{
            res.json({
                msg: 'api working'
            })
        })
        this.app.use('/api/login', routesUser)
        
    }

    midlewares(){
        //parseamos el body
        this.app.use(express.json())

        //CORS
        this.app.use(cors())
    }

    async dbconnecct(){
        try{
            await db.authenticate()
            console.log("base de datos conectada")
        }catch(error){
            console.log(error)
            console.log("Error al conectar con la base de datos")
        }
        
    }

}



export default Server