import mongoose from 'mongoose';
import DataBase from "../../utils/DataBase";
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

    const TokenSchema = new Schema({
        token:{type: String,required: true}
    },
    {_id:false}
    )
    
     const UserListSchema = new Schema({
        
        // _id: mongoose.ObjectId , // ID_USER
        
        EMAIL: {type: String},

        PASSWORD: {type: String,
            trim: true,
            minlength: 1,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error('Password cannot be the word `password`')
                }
            }
        },
        
        NAME:{type: String},

        PROVIDER: {type: String, default: "CredentialsProvider"},

        ROLE: {type: String, default:"User"},

        TOKENS:[
            TokenSchema
        ]
    }
    // ,{_id: false}
    )

    UserListSchema.index({EMAIL: 1}, {unique: true})
    

    UserListSchema.statics.User_Daftar = async function (email, password, name, provider = "credentials", role="User"){
        return await this.create({
            "EMAIL": email,
            "PASSWORD": password,
            "NAME": name ,
            "PROVIDER": provider,
            "ROLE": role
        })
    }

    UserListSchema.statics.User_Login = async function (email, password ){
        const user = await this.find({EMAIL :email})
        .select("-PROVIDER")
        .limit(1)
        .lean()
        
        const isMatch = await bcrypt.compare(password, user[0].PASSWORD)

        var status = !user ?  "Belum terdaftar" : !isMatch ? "Email/password salah" : "Sukses Login"
        
        if(isMatch) return [user, status] // yes?

        return [null, status]// no 
    }


    UserListSchema.statics.User_GetData_ByEmail = async function (email, select ){
        const user = await this.find({EMAIL :email})
        .select(select)
        .limit(1)
        .lean()

        return user
    }


    UserListSchema.statics.findByCredentials = async function (email, password ){ 
        
        const user = await this.find({EMAIL :email})
        .select("-PROVIDER")
        .limit(1)
        
        const isMatch = await bcrypt.compare(password, user[0].PASSWORD)

        var status = !user ?  "Belum terdaftar" : !isMatch ? "Email/password salah" : "Sukses Login"
        
        if(!isMatch) return [null, status]

        return [user, status]
    }

    // method digunakan setelah statics
    UserListSchema.methods.generateAuthToken = async function(){ 
        const user = this

        const token = jwt.sign({_id:user.id.toString()}, "Examplus")
        user.TOKENS = user.TOKENS.concat({token})
        await user.save()
        return token
    }

    UserListSchema.pre('save', async function (next){ 
        const user = this;
        if(user.isModified('PASSWORD')){
            user.PASSWORD = await bcrypt.hash(user.PASSWORD,8)
        }
        next();
    })

    


    

   

    const connection = DataBase("DB_CUSTOMER")

    module.exports = connection.models.TB_USERLIST || connection.model('TB_USERLIST', UserListSchema); 