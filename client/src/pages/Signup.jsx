/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [tracker, setTracker] = useState(false);
  const navigate = useNavigate();

  async function signUp() {
    try {
      setTracker(true);
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstName,
        lastName,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      window.location.reload(false);
      setTracker(false);
    } catch (error) {
      console.log("Invalid credentials");
      setTracker(false);
    }
  }

  function toSignIn() {
    navigate("/signin");
  }

  return (
    <div className="p-28 w-[550px] h-[650px] mt-16 mx-auto bg-white">
      <Heading title={"SignUp"} />
      <SubHeading label={"Enter your details to create an account"} />
      <InputBox
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        label={"First Name"}
        val={"Example"}
      />
      <InputBox
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        label={"Last Name"}
        val={"Messi"}
      />
      <InputBox
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        label={"Email"}
        val={"Lionel@gmail.com"}
      />
      <InputBox
        onChange={(e) => {
          setpassword(e.target.value);
        }}
        label={"Password"}
        val={"password"}
      />
      <Button
        onClick={signUp}
        label={
          tracker ? (
            <div className="flex justify-center  items-center">
              <div
                className="animate-spin inline-block w-5 h-5 mr-4 border-[3px] border-current border-t-transparent text-black rounded-full "
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <p>Signing up...</p>
            </div>
          ) : (
            "SignUp"
          )
        }
      />
      <p className="text-sm text-black-500 mt-1 text-center">
        Already have an account?{" "}
        <a onClick={toSignIn} className="underline font-bold cursor-pointer">
          SignIn
        </a>
      </p>
    </div>
  );
};
