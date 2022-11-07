
import TB_KELASLIST from '../../../database/schema/kelas/tb_kelas'
import mongoose from 'mongoose';

// logika database
export default async function tryoutList(req, res) {

    const { method } = req;


    switch (method) {
        case 'GET': // login
            try {
               
                if(req.body._method === "put"){
                    res.status(200).json({ 
                    PUT: true, 
                    Data: req.body, 
                    })
                }
                
                const DOC = await TB_KELASLIST.Read()

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
                    var result = await TB_KELASLIST.UpdateById(req.body._id, Object.assign({},req.body))
                }

                if(req.body._method === "post"){
                    req.body._id =  new mongoose.Types.ObjectId();
                    req.body.ASSIGN_MATERI = []
                    var result = await TB_KELASLIST.Create(req.body)
                }

                if(req.body._method === "delete"){
                    result = await TB_KELASLIST.DeleteById(req.body._id)
                }

                
                res.redirect(301, `/build/kelas`)

                //  res.status(200).json({ 
                //     PUT: true, 
                //     body: req.body,
                //     Data: result,
                //     _method: req.body._method
                //     })

            } catch (error) {

                res.status(400).json({ Post: false, Status: req.body, error });
                //  res.status(400).send( error );
            }
            break;

        case 'PUT': // masuk data user baru

            try {

                
                
                const DOC = await TB_KELASLIST.Create(req.body)

                // res.redirect(301, `/app/${req.body.ID_KELAS}/materi`)

                res.status(200).json({ 
                    PUT: true, 
                    Data: DOC, 
                
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