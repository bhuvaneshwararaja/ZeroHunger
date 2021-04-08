import { useEffect, useState } from "react"
import "./style.css"
import firebase from "../../firebase"
import md5 from "md5"
import { useHistory } from "react-router"

export default function Landing(){
    const regdetail = {
        username:"",
        mobileno:"",
        password:"",
        retypepassword:""
    }
    const logdetails = {
        username:"",
        password:""
    }
    const [user,setUser] = useState();
    const [isactive,setActive] = useState(false)
    const [toogle,setToogle] = useState("Register")
    const [RegAuth,setRegAuth] = useState(regdetail)
    const [otp,setOtp] = useState("");
    const [LogAuth,setLogAuth] = useState(logdetails);
    const [otpactive,setOtpActive] = useState(false)
    const history = useHistory()
    useEffect(() => {
        const Reg = firebase.database().ref('Portaluser');
        Reg.on('value',(snapshot) => {
            const users = snapshot.val();
            const userarr = [];
            for(let id in users){
                userarr.push(users[id])
            }
            setUser(userarr)
        })
    },[])
    console.log(user)
    const handleUserInput = (e) => {
        const {name,value} = e.target;
        // console.log(e.target.name)
        setRegAuth({
            ...RegAuth,
            [name] :value
        })
        
    }
    const handleLogInput = (e) => {
        const {name,value} = e.target;
        setLogAuth({
            ...LogAuth,
            [name]:value
        })
    }
    console.log(LogAuth)
    // const handleOtp = (e) => {
    //     console.log(e.target.value)
    //     setOtp(e.target.value)
    // }

 const handleClick = (e) => {
     setOtpActive(true)
     e.preventDefault()
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    let number = "+91"+RegAuth.mobileno;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((e) => {
        let code = prompt("Enter your OTP")
        if (code == null) {
          return;
        }
        e.confirm(code).then((res) => {
          setActive(true)
          document.getElementById("success").innerText = "Otp Verified Successfully"
        });
      })
      .catch(() => {
        console.log("error");
      });
  };
//     const otpRender = 
//     otpactive === true ?( <div className="inp-flex">
                  
//     <input className="inp" type="text" placeholder="OTP" onChange={handleOtp}></input>
// </div>):(<></>)
   const formrender = 
    toogle === "Register" ?(<>
       <form className="userform" >
               <div className="switch cl-wt">
                    <button className="active switch-btn">Register</button>
                    <button className="switch-btn" onClick={(e) => {
                        e.preventDefault();
                        setToogle("login")
                    }}>Login</button>
               </div>
               <div className="inp-flex">
                   
                   <input className="inp" type="text" name="username" value={RegAuth.username} placeholder="username" onChange={handleUserInput}></input>
               </div>
               <div className="inp-flex">
                   
                   <input className="inp" type="text" name="mobileno" value={RegAuth.mobileno} placeholder="Mobileno" onChange={handleUserInput}></input>
               </div>
               {/* <div className="inp-flex">
                  
                   <textarea className="inp" type="text" placeholder="Permanent Address" rows="4" cols="50" style={{resize:"none"}} ></textarea>
               </div> */}
               <div className="inp-flex">
                  
                   <input className="inp" type="password" name="password" value={RegAuth.password} placeholder="password" onChange={handleUserInput}></input>
               </div>
               <div className="inp-flex">
                  
                   <input className="inp" type="password" name="retypepassword" value={RegAuth.retypepassword} placeholder="retypepassword" onChange={handleUserInput}></input>
               </div>
               <div id="recaptcha-container" className={isactive === true ? "displaynone" : ""}></div>
               {/* {otpRender} */}
               <h1 id="success"></h1>
               <div className="text-cntr cl-wt">
                   <button className={isactive === true ? "displaynone" : "submit" } onClick={handleClick}>Request OTP</button>
                   <button className={isactive === true ? "submit" : "displaynone" } onClick={(e) => {
                       e.preventDefault()
                       const Reg = firebase.database().ref('Portaluser');
                       const details = {
                          username: RegAuth.username,
                          password:md5(RegAuth.password),
                          mobileno:RegAuth.mobileno,
                          status:"verified"
                       }
                       
                       Reg.push(details)
                   }}>Register</button>
                   
               </div>
           </form></>):(<>
            <form className="userform" >
               <div className="switch cl-wt">
                    <button className="switch-btn" onClick={(e) => {
                        e.preventDefault();
                        setToogle("Register");
                    }}>Register</button>
                    <button className="active switch-btn">Login</button>
               </div>
               <div className="inp-flex">
                   
                   <input className="inp" type="text" name="username" value={LogAuth.username} onChange={handleLogInput} placeholder="username" ></input>
               </div>
               <div className="inp-flex">
                  
                   <input className="inp" type="password" name="password" value={LogAuth.password} onChange={handleLogInput} placeholder="password" ></input>
               </div>
               <div className="text-cntr cl-wt">
                   <button className="submit" onClick={(e) => {
                       e.preventDefault()
                       for(var i=0; i<user.length; i++){
                           if(user[i].username === LogAuth.username && user[i].password === md5(LogAuth.password)){
                               history.push("/home")
                           }
                       }
                   }}>Login</button>

               </div>
           </form></>)
    return <>
        <div className="container">
            <div className="left-container">
                <h1 className="common-heading">Why <span className="important">ZeroHunger ?</span></h1>
                <p>End hunger, achieve food security and improved nutrition and promote sustainable agriculture. Hunger is the leading cause of death in the world. Our planet has provided us with tremendous resources, but unequal access and inefficient handling leaves millions of people malnourished.</p>
                <p>The goals of the Zero Hunger initiative are to end hunger and make sure that enough nutritious foods are available to people by 2030. Other aspects of the goal include ending all forms of malnutrition and promoting sustainable agriculture.</p>
            </div>
            <div className="right-container">
                <img src="/images/landing.png" alt="" />
            </div>
        </div>
        <div className="ourportal" id="login">
           <h1>Welcome To our Portal</h1>
           <p>Register and help Hungry People</p>
            {formrender}
        </div>
    </>
}