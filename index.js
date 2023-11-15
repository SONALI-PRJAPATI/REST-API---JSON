const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const PORT = 8000;

//middleware-plugin
app.use(express.urlencoded({extended:false}));//urlencoded - urlencoded ek plugin h jo bhi data ayega usko body me dalne ka kam krta hai



//ROUTES

app.get('/users',(req,res)=>{
    const html =`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
    });
    
//rest api

app.get('/api/users',(req,res)=>{
return res.json(users);
})


app.route("api/users/:id").get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    }).patch((req,res)=>{
        //todo edit the user with id 
        return res.json({status:"pending"});
        }).delete((req,res)=>{
            //todo edit the user with id 
            return res.json({status:"pending"});
            });

app.post('/api/users',(req,res)=>{
    //todo create new user
    const body =req.body;
    users.push({...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status:"success", id: users.length});
    })

    })

// app.patch('/api/users/:id',(req,res)=>{
//         //todo edit the user with id 
//         return res.json({status:"pending"});
//         })

// app.delete('/api/users',(req,res)=>{
//             //todo delete thr user with id
//             return res.json({status:"pending"});
//             })
app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`))