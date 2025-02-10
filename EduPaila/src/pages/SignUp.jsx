import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import Logo from "../components/logo";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoading(false);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        {/* left */}
        <div className="signup-left">
          <Logo />
          <p className="intro-text">
            This page is intended only for the admins of Edupaila. If you've
            somehow gained access to this page, reporting it may be rewarding.
          </p>
        </div>

        <div className="signup-right">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="UniqueId@edupaila.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button color="blue" type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <Spinner size="sm" />
                  <span className="loading-text pl-2">Loading..</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <OAuth />
          </form>
          {errorMessage && (
            <Alert className="error-alert">{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
