import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>(
    {
    id:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type: String,
        required:true,
        select:0
    },

     email: {
      type: String,
      required: true,
      unique: true,
    },
    needsPasswordChange:{
        type:Boolean,
        default:true
    },

    passwordChangedAt: {
      type: Date,
    },
    role:{
        type:String,
        enum:['superAdmin','admin','student','faculty']
    },
    status:{
        type:String,
        enum:['in-progress','blocked'],
        default:'in-progress'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);




userSchema.pre('save', async function(next){

    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round) );
    next();
  });
  
  
  userSchema.post('save', function(doc, next){
   
    doc.password =''
  
    next()
  });



userSchema.statics.isUserExistsByCustomId = async function (id: string){
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword,hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};






export const User = model<TUser, UserModel>('User', userSchema);