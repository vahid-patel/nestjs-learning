import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

export default ()=>({
    jwt:{
        secret : process.env.JWT_SECRET_KEY
    },
    database : {
        connectionString : process.env.MONGO_URL
    }
})