import mongoose from 'mongoose';
import DataBase from "../../utils/DataBase";


const { Schema } = mongoose;

    const AssignMateriSchema =  new Schema({
        SLUG: {type: String, "default": ""},
        DISPLAY: {type: String , "default": ""},
    },
    {_id: false})
   

    const KelasSchema = new Schema({
        SLUG: {type: String},
        DISPLAY:{type: String},
        DESKRIPSI: {type: String},
        ASSIGN: [AssignMateriSchema]
    })
   

    KelasSchema.index({SLUG: 1}, {unique: true})

    KelasSchema.statics.Create = async function (body){
        return await this.create(body)
    }

    KelasSchema.statics.Read = async function (select){
        return await this.find({}, select).lean()
    }

    KelasSchema.statics.UpdateById = async function (id, body){
        return await this.findOneAndUpdate({_id:id}, body)
    }

    
    KelasSchema.statics.DeleteById = async function (id){
        return await this.findByIdAndRemove({_id:id})
    }



    KelasSchema.statics.UpdateByIdKelas =async function (id_kelas, display, deskripsi, assign_materi){
        const kelas = await this.findOneAndUpdate(
            {
                "SLUG" :id_kelas
            },
            {
                DISPLAY: display, 
                DESKRIPSI: deskripsi,
                ASSIGN: assign_materi
            }
            )

        return kelas
    }


    KelasSchema.statics.FindBySLUG = async function (id_kelas, select){
        return await this.find({SLUG :id_kelas}, select)
        .limit(1)
        .lean()
    }


    KelasSchema.statics.Assign_Materi = async function (id_kelas, Obj_materi){
        const user = await this.findOneAndUpdate(
            {SLUG :id_kelas},
            {
                $push:
                {
                    ASSIGN: Obj_materi
                }
            })
       

        return user
    }

     KelasSchema.statics.Assign = async function (id, assign){
        const user = await this.findOneAndUpdate(
            {_id :id},
            {
               
                ASSIGN: assign
                
            })
       

        return user
    }

    //  KelasSchema.statics.Assign_Submateri = async function (id_kelas, id_materi, Obj_submateri){
    //     const user = await this.update(
    //         {
    //             "ID_KELAS" :id_kelas,
    //             "PATH_MATERI.ID_MATERI": id_materi
    //         },
    //         {
    //             $push:{
    //                 "PATH_MATERI.$.PATH_SUBMATERI": Obj_submateri
    //             }
                
    //         })
       
            
    //     return user
    // }


  
   

    const connection = DataBase("DB_KELAS")

    module.exports = connection.models.TB_KELASLIST || connection.model('TB_KELASLIST', KelasSchema); 