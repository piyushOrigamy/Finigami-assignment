import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, sendOtp } from "./api";
import "../App.css";
import { signIn } from "../actions";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setTimer(30);
    setIsRunning(false);
    setResendOtp(false);
  };

  const onSubmit = () => {
    //check if email is correct
    if (email === "") {
      alert("please enter valid email");
      return;
    }
    sendOtp(email)
      .then((user) => {
        setIsOtpSent(true);
      })
      .catch(() => {
        console.log("error in sending otp");
      });
  };

  const onSubmitOtp = () => {
    login(email)
      .then((user) => {
        dispatch(signIn(user));
        navigate("/");
      })
      .catch(() => {
        alert("user not registered");
      });
  };

  const onResendOtp = () => {
    setIsRunning(true);
    setTimer(30);
    setResendOtp(true);
  };

  useEffect(() => {
    if (isRunning) {
      var interval = setInterval(() => {
        if (timer !== 0) {
          setTimer((time) => time - 1);
        } else if (timer === 0) {
          return () => clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  return (
    <>
      <div className="loginContainer">
        {!isOtpSent ? (
          <div className="emailContainer">
            <input type="text" placeholder="email" value={email} onChange={(e) => handleEmailChange(e)} />
            <button className="submitButton" onClick={onSubmit}>
              send OTP
            </button>
          </div>
        ) : (
          <div>
            <p>OTP sent to: {email}</p>
            <button
              onClick={() => {
                setIsOtpSent(false);
              }}
            >
              change email
            </button>
            <input placeholder="OTP" type="text" />
            <button className="submitButton" onClick={onSubmitOtp}>
              submit OTP
            </button>
            {(timer === 0 || timer === 30) && <button onClick={onResendOtp}>Resend OTP</button>}
            {resendOtp && <p>resend otp after {"00:" + timer} seconds</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
