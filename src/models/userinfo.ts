import db from '../DB/connectiondb'
import { DataTypes } from 'sequelize'
//Ignoren esta, la iba a borrar pero mejor la dejo por si podemos sacar algo de aqui
const Userinfo = db.define('user', {
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    imguser:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    header:{
        type:DataTypes.STRING
    }
},{
    createdAt: false,
    updatedAt: false
})

export default Userinfo 