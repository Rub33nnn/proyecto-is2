import db from '../DB/connectiondb'
import { DataTypes } from 'sequelize'

//---Este modelo de conversasion se usa para crear conversasiones ya que este si actua directamente sobre la tabla

//Aqui definimos un modelo donde vamos a guarda la informacion para la base de datos, este puede ser usado tanto para hacer consultas como para insertar en la BD
const CreateConversation = db.define('conversation', { //Lo que esta en comillas es el nombre de la tabla en donde vas a insertar o consultar los datos
    titulo:{ //Los campos deben tener exactamente los mismos nombres que tienen en la BD
        type: DataTypes.STRING
    },
    idusuarioparticipante1:{
        type: DataTypes.STRING
    },
    idusuarioparticipante2:{
        type:DataTypes.STRING
    },
    fecha_creacion:{
        type:DataTypes.STRING
    },
    fechaactualizado:{
        type:DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
})

export default CreateConversation 