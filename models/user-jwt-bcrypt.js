'use strict';
const {
    Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        // ==========  REGISTER PROCESS ==========
        // in OOP '#' sign as 'private',  #properties --> private, only accessible inside this class, CANNOT for sub-class!!!
        static #encrypt = (password) => bcrypt.hashSync(password, 10) // static method
        // method untuk register: daftar username & password ke database
        static register = ({ username, role, password }) => {
            const encryptedPassword = this.#encrypt(password)
            // const encryptedPassword = bcrypt.hashSync(password, 10)
            // console.log(encryptedPassword) 
            /*
                notes: #encrypt dari static method
                        encryptedPassword akan sama dgn string
                        hasil enkripsi password dari method #encrypt
            */
            return User.create({ username, role, password: encryptedPassword });
        } // ==========  REGISTER PROCESS ==========



        //  ==========  LOGIN PROCESS ==========
        // checkPassword -> doing encryption
        checkPassword = (password) => bcrypt.compareSync(password, this.password);
        // method to generate token JWT
        generateToken = () => {
            // DONT PUT PASSWORD IN payload,  why???
            const payload = {
                id: this.id,
                username: this.username,
                role: this.role,
            }
            // rahasia untuk dipakai verifikasi apakah token ini 
            // berasal dari apps kita??
            const rahasia = process.env.JWT_SECRET;

            // create token from data diatas
            const token = jwt.sign(payload, rahasia);
            return token;
        }

        static authenticate = async ( {username, password}) => {
            try {
                const user = await this.findOne({ where: { username }});
                
                // !!!!!!
                // gaperlu pake if {!..} karena jika terpenuhi, maka flow tidak sampe ke catch!!
                
                // if (!user) return  Promise.reject("User not found");
                // if (!user) return  Promise.reject(user);

                const isPasswordValid = user.checkPassword(password);
                // if (!isPasswordValid) return  Promise.reject("Wrong Password");
                if (user && isPasswordValid) {
                    return Promise.resolve(user);
                }
                
            } catch (err) {
                return  Promise.reject(err);
            }
        }
        //  ==========  LOGIN PROCESS ==========



    };

    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING

        // add role field with query interface: default value "player" as STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};