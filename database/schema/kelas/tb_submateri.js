import mongoose from 'mongoose';
import DataBase from "../../utils/DataBase";


const { Schema } = mongoose;


     const SubmateriSchema = new Schema({
        SLUG: {type: String , "default": ""},
        DISPLAY: {type: String , "default": ""},
        STATUS: {type: String , "default": "Draft"},
        TYPE: {type: String , "default": "Pro"},
        ASSIGNED:{type: Array, "default": []},
        SECTION: {type: Array , "default": []} 
    }
    )


    SubmateriSchema.index({_id: 1}, {unique: true})


    SubmateriSchema.statics.Create = async function (body){
        return await this.create(body)
    }

    SubmateriSchema.statics.Read = async function (select){
        return await this.find({}, select).lean()
    }

    SubmateriSchema.statics.UpdateById = async function (id, body){
        return await this.findOneAndUpdate({_id:id}, body)
    }

    
    SubmateriSchema.statics.DeleteById = async function (id){
        return await this.findByIdAndRemove({_id:id})
    }
    

    SubmateriSchema.statics.Update_Section = async function (id, section){
        // return await this.create(body)

          const submateri = await this.findOneAndUpdate(
            {
            _id: id
            }, 
            {
            "SECTION": section
            })

            return submateri
    }

    
    SubmateriSchema.statics.DeleteByID_Submateri = async function (id_submateri){
        
        return await this.findByIdAndRemove({ SLUG: id_submateri })

           
    }

    


    const connection = DataBase("DB_KELAS")

    module.exports = connection.models.TB_SUBMATERILIST || connection.model('TB_SUBMATERILIST', SubmateriSchema); 