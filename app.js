
const {name}= require('ejs');
const express = require('express');
const {Massage , DModel,DRModle,QuotationModle,CRModle,DFUModel}= require('./mongoConnection')
const app= express();
app.set('view engine', 'ejs');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors= require('cors')
const fs= require('fs')

//middleWares
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());
app.use(cors());



//other 
app.post('/signUp', async(req, res)=>{
    
    if( req.body.psw===req.body.psw_r){
        const MassgeData = {email : req.body.email, psw : req.body.psw};
        await Massage.insertMany([MassgeData])
        res.render("HomePage");
    }else{
        res.end('<h1> password not match</h1>');
    }
    

})

app.get('/notSuccess',(req,res)=>{
    res.end('not correct password')
})



app.post('/login', async(req,res)=>{
    try{
        const check= await Massage.findOne({email: req.body.email});
        if(check.psw===req.body.psw){
            res.render("HomePage");
        }else{
            res.send("password not matches");


        }
    }catch{
        res.end('Invalid User')
    }
})


app.post('/reset',async(req,res)=>{
    try{
        const check= await Massage.findOne({email: req.body.email});
        if(req.body.psw===req.body.psw_r){
            await Massage.updateOne({psw: check.psw},{$set : {psw: req.body.psw_r}})
            res.render("HomePage")
        }else{
            res.end("Please Enter right password");
        }

    }catch{
        res.end('Invalid User')
    }
})


// SinglefileUpload


// Director Registration store information in the database

app.post('/DRegistration_data',async(req,res)=>{
    const MassageData = {
        name : req.body.name,
        DOB : req.body.DOB,
        MobNumber : req.body.MobNumber,
        DL : req.body.DL,
        VC : req.body.VC,
        education : req.body.education,
        DIN_NO : req.body.DIN_NO,
        email : req.body.email,
        Pan : req.body.Pan,
        Occupation : req.body.Occupation,
    }
    try{
        await DModel.insertMany([MassageData]);
        res.redirect('DfileUpload')
        

    }catch{
        res.end("Data does't store in the datbase");
    }
})


//Company Detail Registration form store in database
app.post('/DetailRegistration_data',async(req,res)=>{
    const MassageData = {
        companyName : req.body.companyName,
        email : req.body.email,
        mobile : req.body.mobile,
        address : req.body.address,
        purposeDetail : req.body.purposeDetail,
        objectives : req.body.objectives,

       ShareHolders: {directorName1 : req.body.directorName1,
        directorDIN1 :req.body.directorDIN1,
        directorEmail1: req.body.directorEmail1,
        directorMobile1: req.body.directorMobile1},
        
       PaidCapital: { capitalParticular1 :  req.body.capitalParticular1,
        capitalShares1 :req.body.capitalShares1,
        capitalAmountPerShare1: req.body.capitalAmountPerShare1,
        capitalAmountRupees1 : req.body.capitalAmountRupees1},        
    
    }
    console.log(MassageData);
    try{
        await DRModle.insertMany([MassageData])
        res.render('HomePage')

    }catch{
        res.end("Data does't store in the datbase");
    }
})

//quotation form store data into the database

app.post('/quotation_data',async(req,res)=>{
    const QuotationData = {
        companyName : req.body.companyName,
        address : req.body.address,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        purpose : req.body.purpose,
        quotationNumber : req.body.quotationNumber,
        expiryDate : req.body.expiryDate,

       product1: {product1Name : req.body.product1Name,
        product1Print :req.body.product1Print,
        product1Quantity: req.body.product1Quantity,
        product1Total: req.body.product1Total},
        
       product2: {product2Name : req.body.product2Name,
        product2Print :req.body.product2Print,
        product2Quantity: req.body.product2Quantity,
        product2Total: req.body.product2Total},      
    
    }
    console.log(QuotationData);
   
    try{
        await QuotationModle.insertMany([QuotationData]);
        res.render("HomePage")
    }catch{
        res.end("Data does't store in the datbase");
    }
})

//CRegistration_data store in database

const fileFilter = (req,file,cb) => {
    if (file.fieldname === "image") {
        (file.mimetype === 'image/jpeg' 
         || file.mimetype === 'image/png')
        ? cb(null,true)
        : cb(null,false);
    }
    else if(file.fieldname === "document"){
        (file.mimetype === 'application/msword' 
        || file.mimetype === 'application/pdf')
        ? cb(null,true)
        : cb(null,false);
    }
}
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'/uploads'));
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
// const storage = multer.memoryStorage();
const upload = multer({storage: storage, fileFilter:fileFilter})

app.post('/CRegistration_data',upload.single('document'),async(req,res)=>{
    // const document= req.file;
    const CRegistrationData = {
        Cname : req.body.Cname,
        Ctype : req.body.Ctype,
        purpose : req.body.purpose,
        PCapital : req.body.PCapital,
        AuthCapital : req.body.AuthCapital,
        address : req.body.address, 
        document : {data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))} ,
    
    }
    console.log(CRegistrationData);
    console.log(CRegistrationData.document)
    // await QuotationModle.insertMany([QuotationData]);
    //     res.render("HomePage")
    try{
        await CRModle.insertMany([CRegistrationData]);
        res.render("HomePage")
    }catch{
        res.end("Data does't store in the database");
    }
})

//Director file uploads section:

const upload1 = multer({storage: storage, fileFilter:fileFilter}).fields([{
    name :"PanCard"},
    {name :'Passport'},
//     {name :'Dlicense'},
//     {name:'VotingCard'},
//     {name :'bankStatement'},
//     {name:'LightBill'},
//     {name :'PassportPhoto'},
//     {name:'Dsign'},
//     {name :'img'},
 ])
app.post('/DfileUpload-data',upload1,async(req, res)=>{
    const document= new DFUModel(req.body);
    console.log(document);
})




app.get('/DfileUpload',(req,res)=>{
    res.render('DfileUpload');
})
app.get('/reset',(req,res)=>{
    res.render('reset');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

 app.get('/Home',(req,res)=>{
    res.render('HomePage');
})

app.get('/',(req,res)=>{
    res.render('signUp');
})

app.get('/CRegistration',(req,res)=>{
    res.render('CRegistration')
})

app.get('/DRegistration',(req,res)=>{
    res.render('DRegistration')
})
app.get('/DetailRegistration',(req,res)=>{
    res.render('DetailRegistration')
})
app.get('/Quotation',(req,res)=>{
    res.render('Quotation')
})

app.listen(3000,()=>{
    console.log("server is responding......");
})