// to take request and give response
// it is connected to the routers
// it will take out data from the body and send it to database and stored
import { UserModel } from "../db/models/user-schema.js"; 
import { hashing } from "../utils/encrypt.js";
export const userController = {
    login(request, response){
        const userInfo = request.body;
        const doc = UserModel.findOne({'email':userInfo.email}).exec();
        console.log('Doc is', doc);
        if(doc && doc._id){
        const plainPassword = userInfo.password;
        const dbPassword = doc.password;
        if(hashing.matchPassword(plainPassword, dbPassword)){
            response.json({message:'Welcome '+doc.name});
        }
        else{
            response.json({message:'Invalid Userid or passwod'});
        }
       }
       else{
        response.json({message:'Invalid Userid or passwod'});
       }
       
        // const body = request.body;
        //console.log('Request Body is', body);
        //response.json({message:'Login'});
    },
    async register(request, response){ //it will help in adding in the database
        const userInfo = request.body;
        userInfo.password = hashing.passwordHash( userInfo.password);
        try{
        const doc = await UserModel.create(userInfo);
        if(doc && doc._id){
        response.json({message:'Registered Succefully'});
    }
    else{
        response.json({message:'Problem in Register'});
    }
}
catch(err){
    console.log('Register Err', err);
    
}
    },
    profile(request, response){
        // we used params in order to create a path to retrieve
        const userName = request.params.username;
        console.log('All Params', userName);
        response.json({message:userName + 'Profile'});
       
    },
    changePassword(request, response){
        response.json({message:'Change Password'});
}
}