require('dotenv').config()
const express = require('express')
const app = express()
const Data = require('./Data.json')
const PORT = process.env.PORT || 5000;
const fs = require('fs')



app.use(express.json())



//********************************** GET All TASKS ************************************************//

app.get('/GET/tasks',(req,resp)=>{

        try {
            
            resp.status(200).json(Data)

        } catch (error) {
            
            resp.status(400).json({result: 'There Is Something Error...'})
        }

})

//*********************************GET TASK BASED ON ID ****************************************//

app.get('/GET/tasks/:id',(req,resp)=>{

        const userId = Number(req.params.id)

        const user = Data.filter((user)=>{

                return user.id === userId

        })
    
        try {
            
            resp.status(200).json(user)

        } catch (error) {

            resp.status(400).json({result: 'There Is Something Error...',error})
            
        }

})

//************************************************ADD TASK ON LIST***************************************//

app.post('/POST/tasks/addTask',(req,resp)=>{

    const newData = req.body

    const currentDate = new Date()
   
        Data.push({id: Data.length + 1, ...newData, createdOn: currentDate,updatedOn:currentDate })
   
    fs.writeFile('Data.json',JSON.stringify(Data),(err,data)=>{

            if(err)
                {
                    resp.status(400).json({result: 'There Is Something Error...'})
                }
                else
                {
                    resp.status(200).json({result: 'Data Added Successfully...',data})
                }

    })

    resp.status(200).json(Data)


})

//*********************************************UPDATE TASK BASED ON ID **********************************//

app.put('/PUT/tasks/:id',(req,resp)=>{

    const updatedDate = new Date();
    const newData = req.body

    const userId = Number(req.params.id)

    const user = Data.find((data)=>{

            return data.id === userId

    })

    Object.assign(user,{...newData,updatedOn:updatedDate})
    
    fs.writeFile('Data.json',JSON.stringify(Data),(err,data)=>{

            try {

                resp.status(200).json({result:'Updated Data Successfully...',data})
                
            } catch (error) {

                resp.status(400).json({result:'There Is Something Error...',error})
                
            }

            
    })
    resp.status(200).json({result:'Updated Data Successfully...',Data})


})

//************************************************* DELETE TASK BASED ON ID************************************/


app.delete('/DELETE/tasks/:id',(req,resp)=>{

        const userId = Number(req.params.id)
        
        const user = Data.findIndex((data)=>{

                return data.id === userId

        })
        Data.splice(user,1)
        
       fs.writeFile('Data.json',JSON.stringify(Data),(err,data)=>{

            try {

                resp.status(200).json({result: 'Data Added  Successfully...'})
                
            } catch (error) {
                resp.status(400).json({result: 'There Is Something Error...'})
            }


       })
       resp.status(200).json(Data)
})



//**********************LISTEN ON PORT *************************************************

app.listen(PORT, ()=>{console.log(`The Server Is Running on http://localhost:${PORT}`)})