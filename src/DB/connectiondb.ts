import { Sequelize } from "sequelize";
//Aqui se hace la conexion a la BD
const sequilize = new Sequelize('bd_appmensajeria', 'root', 'root', { //(Nombre de la BD, usuario, contraseña)
    host: 'localhost', //Host
    dialect: 'mysql' //el server que usamos para la bd en este caso mysql
})

export default sequilize