const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017',{
    dbName:'RegisteredUser1'
},{useNewUrlParser : true , useUnifiedTopology : true}).then(()=>console.log('Database conncted')).catch((e)=>console.log(e));

const mongooseSchema= new mongoose.Schema({
    email : {type : String, required :true},
    psw : {type : String, required :true},
})

const Massage = mongoose.model("user",mongooseSchema);

const DRegistrationSchema= new mongoose.Schema({
      name : {type: String , required: true},
      DOB : {type: String , required: true},
      MobNumber: {type: Number , required: true},
      DL : {type: Number , required: true},
      VC : {type: Number , required: true},
      education : {type: String , required: true},
      DIN_NO : {type: Number , required: true},
      email : {type: String , required: true},
      Pan : {type: Number , required: true},
      Occupation: {type: String , required: true},
})

const DModel=mongoose.model('DirectorRegistration',DRegistrationSchema);


const DetailRegistration= new mongoose.Schema({
    companyName :{type: String, required: true},
    email :{type: String, required: true},
    mobile :{type: Number, required: true},
    address :{type: String, required: true},
    purposeDetail :{type: String, required: true},
    objectives :{type: String, required: true},

   ShareHolders:{ directorName1 : {type:String, required :true},
    directorDIN1 :{type:String , required : true},
    directorEmail1:{type:String, required:true},
    directorMobile1 : {type:Number, requiered: true}},

   PaidCapital :{capitalParticular1 : {type:String , required :true},
    capitalShares1 :{type:Number, required : true},
    capitalAmountPerShare1:{type:Number, required:true},
    capitalAmountRupees1 : {type:Number, requiered: true}},
    
})

const DRModle= mongoose.model('DetailCompanyRegistration',DetailRegistration)


const quotationSchema= new mongoose.Schema({
    companyName :{type: String, required: true},
    address :{type: String, required: true},
    phoneNumber :{type: Number, required: true},
    email :{type: String, required: true},
    purpose :{type: String, required: true},
    quotationNumber :{type: Number, required: true},
    expiryDate :{type: String, required: true},

   product1:{ product1Name : {type:String, required :true},
    product1Print :{type:String , required : true},
    product1Quantity:{type:Number, required:true},
    product1Total : {type:Number, requiered: true}},

   product2:{ product2Name : {type:String, required :true},
    product2Print :{type:String , required : true},
    product2Quantity:{type:Number, required:true},
    product2Total : {type:Number, requiered: true}},
    
})


const QuotationModle= mongoose.model('QuotationFrom', quotationSchema)


const CRegistrationSchema = new mongoose.Schema({
    Cname :{type: String, required: true},
    Ctype :{type: String, required: true},
    purpose :{type: String, required: true},
    PCapital :{type: Number, required: true},
    AuthCapital :{type: Number, required: true},
    address:{type: String, required: true},
    document :{data : Buffer},
})

const CRModle= mongoose.model("CRegistation",CRegistrationSchema)

const DfileUploadSchema= new mongoose.Schema({
    PanCard: {type:String, required: true},
    Passport :{type :String, required : true},
    // DLicense :{type :String, required : true},
    // VotingCard :{type :String, required : true},
    // BankStatement :{type :String, required : true},
    // LightBill :{type :String, required : true},
    // PassportPhoto :{type :String, required : true},
    // Dsign :{type :String, required : true},
    // img :{type :String, required : true},
})
const DFUModel= mongoose.model('DFileUPloads',DfileUploadSchema)

module.exports ={Massage, DModel,DRModle,QuotationModle,CRModle,DFUModel};
