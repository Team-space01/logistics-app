import { mongoose } from 'mongoose'
import { config } from 'dotenv';
config();

// Use the environment variables in your code
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PW;

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@logisticssolution.o3bjj2n.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB'))
.catch((err) => console.log(err));
