import db from '../DB/connectiondb'
import { DataTypes } from 'sequelize'

//Aqui definimos un modelo donde vamos a guarda la informacion para la base de datos, este puede ser usado tanto para hacer consultas como para insertar en la BD
const Mensaje = db.define('message', { //Lo que esta en comillas es el nombre de la tabla en donde vas a insertar o consultar los datos
    conversation_id:{ //Los campos deben tener exactamente los mismos nombres que tienen en la BD
        type: DataTypes.STRING
    },
    userid:{
        type: DataTypes.STRING
    },
    txt_message:{
        type: DataTypes.STRING
    },
    fechadeenvio:{
        type:DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
})

export default Mensaje 