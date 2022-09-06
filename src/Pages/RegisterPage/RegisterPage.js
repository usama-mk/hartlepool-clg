import React, { useState } from 'react'
import "./RegisterPage.css"
// import icons
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { SiHiveBlockchain } from "react-icons/si"
import { useNavigate } from "react-router-dom";
// imports for authentication
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { useDispatch } from "react-redux";
import { logIn } from '../../features/userSlice';
import { addDoc, collection } from 'firebase/firestore';


function RegisterPage() {

  const navigate = useNavigate();//For Navigation
  const dispatch = useDispatch();

  // toggle show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  function toggleShowPassword() {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  function toggleShowConfirmPassword() {
    if (showConfirmPassword) {
      setShowConfirmPassword(false)
    } else {
      setShowConfirmPassword(true)
    }
  }

  // MAIN FUNCTIONS
  // 
  // 
  // 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reg, setReg] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Register User
  function registerUser(event) {
    event.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("*all fields are required")
      return
    }
    else if (password !== confirmPassword) {
      setError("*passwords don't match")
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(//user created
        (userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(//name updated
            () => {
              addDoc(collection(db, 'users'),
                {
                  uid: userCredential.user.uid,
                  dob: dob,
                  reg_no: reg,
                  role: "user",
                  following: []
                })
            }
          ).then(() => {//user added to collection
            dispatch(
              logIn({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                role: "user"
              })
            )
            navigate("/home")
          }
          )
        }
      )
      .catch((error) => {
        setError("*" + error.code.replace(/-/g, " "))
      });


  }











  return (
    <div className='registerPage'>

      {/* logo */}
      <div className="registerPage__logo">
        <SiHiveBlockchain /><span>C<small>BLOG</small></span>
      </div>

      {/* form */}
      <form className="registerPage__form">

        <h4>Register</h4>

        {/* name */}
        <div className="registerPage__formInputGroup">
          <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required={true}
            onKeyUp={() => setError("")}
          />
        </div>

        {/* reg */}
        <div className="registerPage__formInputGroup">
          <input
            type="text"
            placeholder='Reg No'
            value={reg}
            onChange={(event) => setReg(event.target.value)}
            required={true}
            onKeyUp={() => setError("")}
          />
        </div>

        {/* dob */}
        <div className="registerPage__formInputGroup">
          <input
            type="date"
            placeholder='Name'
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            required={true}
            onKeyUp={() => setError("")}
          />
        </div>

        {/* email */}
        <div className="registerPage__formInputGroup">
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required={true}
            pattern="^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))"
            title="Please enter a valid email address"
            onKeyUp={() => setError("")}
          />
        </div>

        {/* password */}
        <div className="registerPage__formInputGroup">
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={true}
          />
          <span onClick={() => toggleShowPassword()}>
            {
              showPassword ?
                <FaEyeSlash />
                :
                <FaEye />
            }
          </span>
        </div>

        {/* confirm password */}
        <div className="registerPage__formInputGroup">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required={true}
            onKeyUp={() => {
              if (confirmPassword !== password) {
                setError("*passwords don't match")
              } else {
                setError("")
              }
            }}
          />
          <p id='pwdError'>{error}</p>
          <span onClick={() => toggleShowConfirmPassword()}>
            {
              showConfirmPassword ?
                <FaEyeSlash />
                :
                <FaEye />
            }
          </span>
        </div>

        <button
          type="submit"
          className='registerPage__formInputButton'
          onClick={registerUser}
        >
          Register
        </button>

        <br />
        <p onClick={() => navigate("/")}>Already Have An Account</p>
      </form>


    </div >
  )
}

export default RegisterPage