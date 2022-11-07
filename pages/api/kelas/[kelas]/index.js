
import TB_KELASLIST from '../../../../database/schema/kelas/tb_kelas'
import TB_MATERILIST from '../../../../database/schema/kelas/tb_materi'
import mongoose from 'mongoose';

// logika database
export default async function tryoutList(req, res) {

    const { method } = req;
    const { kelas } = req.query


    switch (method) {
        case 'GET': // login
            try {
    
                const DOC = await TB_MATERILIST.Read()

                res.status(200).json({ 
                    Get: true, 
                    Data: DOC, 
                })

            } catch (error) {
                res.status(400).json({ Get: false, error });
            }

            break;

        case 'POST': // masuk data user baru

            try {
                
                delete req.body.__v
                
                
                if(req.body._method === "put"){
                    delete req.body.ASSIGN_MATERI
                    var result = await TB_MATERILIST.UpdateById(req.body._id, Object.assign({},req.body))
                }

                if(req.body._method === "post"){
                    req.body._id =  new mongoose.Types.ObjectId();
                    req.body.ASSIGN = []
                    await TB_MATERILIST.Create(req.body)
                    // const assign = await TB_KELASLIST.Assign_Materi(kelas, req.body)


                }

                if(req.body._method === "delete"){
                    result = await TB_MATERILIST.DeleteById(req.body._id)
                }

                if(req.body._method === "assign"){
                    await TB_KELASLIST.Assign(req.body._id, req.body.ASSIGN)
                }

                
                res.redirect(301, `/build/kelas/${kelas}`)


            } catch (error) {

                res.status(400).json({ Post: false, Status: req.body, error });
                //  res.status(400).send( error );
            }
            break;

        case 'PUT': // masuk data user baru

            try {


                const DOC = await TB_MATERILIST.Create(req.body)
                // const assign = await TB_KELASLIST.Assign_Materi(kelas, req.body)


                res.status(200).json({ 
                    PUT: true, 
                    DOC
                })


            } catch (error) {

                res.status(400).json({ PUT: false, Status: req.body });
                //  res.status(400).send( error );
            }
            break;
        default:
            res.status(400).json({ PUT: false });
    }



}