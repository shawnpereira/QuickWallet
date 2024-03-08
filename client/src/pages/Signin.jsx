import Button from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tracker, setTracker] = useState(false); // Tracker for loading state
  const navigate = useNavigate();
  async function signIn() {
    try {
      setTracker(true); // Start loading state
      // Make a POST request to the server for sign in
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      // Save the token received from the server to local storage
      localStorage.setItem("token", res.data.token);
      // Redirect the user to the dashboard after successful sign in
      navigate("/dashboard");
      // Reload the window to ensure the app fetches new data if needed
      window.location.reload(false);
      setTracker(false); // Stop loading state
    } catch (error) {
      // Alert user if sign in fails
      alert("Invalid credentials");
      setTracker(false); // Stop loading state
    }
  }

  return (
    <div className="p-28 w-[550px] h-[600px] mt-16 mx-auto bg-white">
      <Heading title={"SignIn"} />
      <SubHeading label={"Enter your details to SignIn"} />
      <InputBox
        onChange={(e) => setUsername(e.target.value)}
        label={"Email"}
        val={"Lionel@gmail.com"}
      />
      <InputBox
        onChange={(e) => setPassword(e.target.value)}
        label={"Password"}
        val={"password"}
      />
      <Button
        onClick={signIn}
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
            "SignIn"
          )
        }
      />
      <p className="text-sm text-black-500 mt-1 text-center">
        Dont have an account?{" "}
        <a
          onClick={() => navigate("/signup")}
          className="underline font-bold cursor-pointer"
        >
          SignUp
        </a>
      </p>
    </div>
  );
};
