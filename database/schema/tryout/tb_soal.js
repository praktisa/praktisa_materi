import mongoose from 'mongoose';
import DataBase from "../../utils/DataBase";


const { Schema } = mongoose;

     const AssignSoal = new Schema({
        "SOAL":{type: String},
        "OPSI": {type: String},
        "KUNCI": {type: String},
        "PEMBAHASAN": {type: String},
    }
    )

    const SoalSchema = new Schema({
        "ID_SUBMATERI": {type: String},
        "SECTION": {type: String},
        "ASSIGN_SOAL":[AssignSoal]
    }
    )

    // SoalSchema.index({_id: 1}, {unique: true})


    SoalSchema.statics.All = async function (){
        return await this.find({}).lean() 
    }

    SoalSchema.statics.Add = async function (body){
        return await this.create(body)
    }

    SoalSchema.statics.Add_Many = async function (arr_body){
        return await this.insertMany(arr_body)
    }

    SoalSchema.statics.Find = async function (section){
        return await this.find({SECTION :section}).lean()
    }

     SoalSchema.statics.FindBySubmateri = async function (id_submateri){
        return await this.find({ID_SUBMATERI :id_submateri}).lean()
    }


  
   

    const connection = DataBase("DB_ADMIN")

    module.exports = connection.models.TB_SOALLIST || connection.model('TB_SOALLIST', SoalSchema); 