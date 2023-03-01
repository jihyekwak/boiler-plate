require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
// Express 4.x 에는 body-parser
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require("./models/User");

// application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

// application/json
// app.use(bodyParser.json())
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!')
})

app.post("/register", (req, res) => {

    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save().then((userInfo) => {
        if(!userInfo) return res.json( {
            success: false, err
        }) 
        return res.status(200).json({
            success:true
        })
    })
})

app.post("/login", (req, res) => {

    // 요청된 email을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email }).then((foundUser) => {
        if(!foundUser) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        // 요청된 email이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다. 
        foundUser.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            })

            // 비밀번호가 맞다면 토큰을 생성한다.
            foundUser.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에? 쿠키? localStorage?
                // 쿠키에 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id})
            })
        })
    })



})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})