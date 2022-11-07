import mongoose from 'mongoose';
import DataBase from "../../utils/DataBase";



const { Schema } = mongoose;

    const AssignSubmateriSchema =  new Schema({
        SLUG: {type: String, "default": ""},
        DISPLAY: {type: String , "default": ""},
    },
    {_id: false})
    AssignSubmateriSchema.index({SLUG: 1})
    
    const MateriSchema = new Schema({
        SLUG: {type: String , "default": ""},
        DISPLAY: {type: String , "default": ""},
        ASSIGNED:{type: Array, "default": []},
        ASSIGN: [AssignSubmateriSchema]
    }
    )
    MateriSchema.index({SLUG: 1}, {unique: true})

    MateriSchema.statics.Create = async function (body){
        return await this.create(body)
    }

    MateriSchema.statics.Read = async function (select){
        return await this.find({}, select).lean()
    }

    MateriSchema.statics.UpdateById = async function (id, body){
        return await this.findOneAndUpdate({_id:id}, body)
    }

    
    MateriSchema.statics.DeleteById = async function (id){
        return await this.findByIdAndRemove({_id:id})
    }

     MateriSchema.statics.FindBySLUG = async function (slug, select){
        return await this.find({SLUG :slug}, select)
        .limit(1)
        .lean()
    }

      MateriSchema.statics.Assign = async function (id, assign){
        const user = await this.findOneAndUpdate(
            {_id :id},
            {
               
                ASSIGN: assign
                
            })
       

        return user
    }
    
    


    MateriSchema.statics.Assign_Submateri = async function (id_kelas, id_materi, Obj_submateri){
         const user = await this.findOneAndUpdate(
            {
                // "ID_KELAS" :id_kelas, 
            "ID_MATERI": id_materi
            }, 
            {
                $push:
                {
                    "ASSIGN_SUBMATERI": Obj_submateri
                }
            })
       

        return user
    }

    MateriSchema.statics.Delete_Assign_Submateri = async function (_id, id_submateri){
         
        const user = await this.findOneAndUpdate(
            {
            "_id": _id
            }, 
            {
                $pullAll:
                {
                    "SUBMATERI": [{ID_SUBMATERI:id_submateri}]
                }
            })
       

        return user
    }

     MateriSchema.statics.DeleteByID = async function (id_objek_materi){
        return await this.findByIdAndRemove({ _id: id_objek_materi })
        
    }

   

    const connection = DataBase("DB_KELAS")

    module.exports = connection.models.TB_MATERILIST || connection.model('TB_MATERILIST', MateriSchema); 