import React, { useEffect, useState } from 'react'
import "./LoginPage.css"
// import icons
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { SiHiveBlockchain } from "react-icons/si"
// imports for authentication
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, selectUser } from '../../features/userSlice';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';


function LoginPage() {
  // UTILITY FUNCTIONS
  // 
  // 

  const navigate = useNavigate();// For Navogation
  const [loginError, setLoginError] = useState("");

  // Toggle Show Password
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }




  // MAIN FUNCTIONS
  // 
  // 

  // Check if User is Already Logged in
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user)
      navigate("/home");
  }, [])



  // Login User
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function loginUser(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      setLoginError("*all fields are required")
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(//user logged in
        (userCredential) => {
          const q = query
            (
              collection(db, "users"),
              where("uid", "==", userCredential.user.uid),
              limit(1)
            )
          getDocs(q).then((querySnapshot) => {
            dispatch(logIn(
              {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                role: querySnapshot.docs[0].data().role,
              }
            ))
            navigate("/home")
          })
        }
      )
      .catch((error) => {
        setLoginError("*" + error.code.replace(/-/g, " "))
      });
  }

  // Forget Password
  function forgetPassword() {
    if (email === "") {
      setLoginError("* Enter email to reset pasword")
      return
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoginError("* Reset email has been sent !")
      }).catch((error) => {
        setLoginError("*" + error.code)
      })
  }



  return (
    <div className='loginPage'>

      <div className="loginPage__logo">
        <SiHiveBlockchain /><span>C<small>BLOG</small></span>
      </div>

      <p className="loginPage__description">
        Stay up to date with the latest stories and commentary about blockchain and crypto ecosystem.
      </p>

      <form action="#" className="loginPage__form">

        <h4>Login</h4>

        <div className="loginPage__formInputGroup">
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            pattern="^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))"
            title="Please enter a valid email address"
            onKeyUp={() => setLoginError("")}
          />
        </div>

        <div className="loginPage__formInputGroup">
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            onKeyUp={() => setLoginError("")}
          />


          <p id='loginError'>{loginError}</p>

          <span onClick={() => toggleShowPassword()}>
            {
              showPassword ?
                <FaEyeSlash />
                :
                <FaEye />
            }
          </span>
        </div>

        <button
          type="submit"
          className='loginPage__formInputButton'
          onClick={loginUser}
        >
          Login
        </button>

        <p onClick={() => navigate("/register")}>Create New Account</p>
        <p onClick={forgetPassword}>forget password</p>
      </form>

    </div>
  )
}

export default LoginPage 