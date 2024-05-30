import React from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import def_prof_pic from "../assets/def_icon_profile.jpg";
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log("userInfo:heropage::", userInfo);
  return (
    <div className="py-5 ">

      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? (
            <></>
          ) : (
            <h1 className="text-center mb-4">MERN CRUD APP</h1>
          )}
          {userInfo ? (
            <div className="text-center mb-4">
              <h3 className="text-center mb-4">Welcome</h3>
              {userInfo.image ? (
                <Image
                  src={userInfo.image}
                  roundedCircle
                  alt="Profile"
                  width={100}
                  height={100}
                  className="mb-3"
                />
              ) : (
                <Image
                  src={def_prof_pic}
                  roundedCircle
                  alt="Default Profile"
                  width={100}
                  height={100}
                  className="mb-3"
                />
              )}

              <h2>{userInfo.name?.toUpperCase()}</h2>
              <p>{userInfo.email?.toUpperCase()}</p>
            </div>
          ) : (
            <div className="d-flex ">
              <LinkContainer to={"/login"}>
                <Button variant="primary" className="me-3">
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to={"/register"}>
                <Button variant="secondary">Register</Button>
              </LinkContainer>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
