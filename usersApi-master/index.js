var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));




var personas = [{
    "id": 1,
    "nombre": "dtwigg",
    "rol": "Supervisor",
    "admin": true
  }, {
    "id": 2,
    "username": "ygagen",
    "rol": "Supervisor",
    "admin": false
  }, {
    "id": 3,
    "username": "ssutor",
    "rol": "Construction Manager",
    "admin": false
  }, {
    "id": 4,
    "username": "rdyter",
    "rol": "Supervisor",
    "admin": true
  }, {
    "id": 5,
    "username": "ahellwich",
    "rol": "Project Manager",
    "admin": false
  }];
  var clientes=[{
    "id": 1,
    "nombre": "Ferdinand",
    "apellido": "Egglestone",
    "sexo": "Male",
    "edad": 36
  }, {
    "id": 2,
    "nombre": "Rheba",
    "apellido": "Prys",
    "sexo": "Female",
    "edad": 88
  }, {
    "id": 3,
    "nombre": "Sadella",
    "apellido": "Lyddon",
    "sexo": "Male",
    "edad": 92
  }, {
    "id": 4,
    "nombre": "Kelley",
    "apellido": "Gilfoyle",
    "sexo": "Male",
    "edad": 28
  }, {
    "id": 6,
    "nombre": "Justina",
    "apellido": "Panniers",
    "sexo": "Female",
    "edad": 56
  }, {
    "id": 8,
    "nombre": "Valery",
    "apellido": "Suffe",
    "sexo": "Male",
    "edad": 1
  }, {
    "id": 12,
    "nombre": "Alexandro",
    "apellido": "Esland",
    "sexo": "Male",
    "edad": 46
  }, {
    "id": 15,
    "nombre": "Evangelina",
    "apellido": "Devonport",
    "sexo": "Male",
    "edad": 9
  }, {
    "id": 14,
    "nombre": "Janette",
    "apellido": "Earengey",
    "sexo": "Male",
    "edad": 4
  }, {
    "id": 5,
    "nombre": "Brendon",
    "apellido": "Minchinden",
    "sexo": "Male",
    "edad": 97
  }];
var id =14;
app.get("/login",function(req,res){
    
    res.send("ok");
});

app.get("/loginUsuario",function(req,res){
    console.log(req.query);
    if(req.query.usr!=undefined && req.query.pass!=undefined){
        if(req.query.usr==="usuario"&&req.query.pass==="1234")
            res.send("true");    
        else
            res.send("false");
        return;
    }
    res.send("Debe ingresar Usuario y Contraseña");
    
});
app.get("/usuarios",function(req,res){
   
 res.send(personas);    

        return;
   
   
    
});
app.get("/clientes",function(req,res){
   
    res.send(clientes);    
   
           return;
      
      
       
   });

app.post("/loginUsuario",function(req,res){
    setTimeout(function(){
        console.log(req.body)
        if(req.body.usr!=undefined && req.body.pass!=undefined){
            if(req.body.usr==="usuario"&&req.body.pass==="1234")
                res.send("true");    
            else
                res.send("false");
            return;
        }
        res.send("Debe ingresar Usuario y Contraseña");
    },2000);
    
});

app.post("/login",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        
       
        if(req.body.email!=undefined && req.body.password!=undefined){
            if(req.body.email==="usuario"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'User'}")
                res.send({'type': 'User'});    
            }else if(req.body.email==="admin"&&req.body.password==="1234"){
                console.log("Sale del servidor "+"{'type': 'Admin'}")
                res.send({'type': 'Admin'});    
            }else{
                console.log("Sale del servidor "+"{'type': 'error'}")
                res.send({'type': 'error'});
            }
            return;
        }
        console.log("Sale del servidor "+"{'type': 'error'}")
        res.send({'type': 'error'});
    },2000);
    
});


app.post("/nueva",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.apellido!= "") 
			&&  (req.body.localidad!= undefined&&req.body.localidad!= "") && (req.body.sexo!= undefined&&req.body.sexo!= "")){
	
			id = id +1;
       
			
			var data = {"id":id,"nombre":req.body.nombre,"apellido":req.body.apellido,"localidad":req.body.localidad,"sexo":req.body.sexo};
				personas.push(data);
                res.send(data);    
     
            return;
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.apellido!= "") 
			&&  (req.body.localidad!= undefined&&req.body.localidad!= "") && (req.body.sexo!= undefined&&req.body.sexo!= "")){
	
			
        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].nombre=req.body.nombre;
						personas[i].apellido=req.body.apellido;
						personas[i].localidad=req.body.localidad;
						personas[i].sexo=req.body.sexo;
							res.send(req.body);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/editarFoto",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if((req.body.id!= undefined&&req.body.id!= "") &&(req.body.foto!= undefined&&req.body.foto!= "") ){
	
			
        
				for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas[i].foto=req.body.foto;
						res.send(personas[i]);    
							return;
					}
				}
		
        }
        res.send({'type': 'error'});
    },2000);
    
});

app.post("/eliminar",function(req,res){
    setTimeout(function(){
        
       console.log(req.body);
        if(req.body.id!= undefined&&req.body.id!= ""){
	
			for(var i =0;i<personas.length;i++){
					if(req.body.id== personas[i].id){
						personas.splice(i,1);
        	var data = {"type":"ok"};
							res.send(data);    
							return;
					}
				}
			
			

        }
        res.send({'type': 'error'});
    },2000);
    
});

app.listen(3001,function(){
    console.log("Api en el puerto 3001");
});