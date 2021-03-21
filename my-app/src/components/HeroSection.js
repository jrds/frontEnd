import React from 'react'
import "../App.css"
import { Button } from './Button'
import Container from "react-bootstrap/Container"
import "./HeroSection.css";


function HeroSection() {
    return (
        <Container className = "hero-container">
            <video src = "/videos/4now.mp4" autoPlay loop muted/>
            <h1> WELCOME TO CODI</h1>
            <p> Your streamlined learning environment</p>
            <div className = "hero-btns">
                <Button className = "btns" buttonStyle = "btn--outline" buttonSize = "btn-large">
                    Here to Teach
                </Button>
                <Button className = "btns" buttonStyle = "btn--primary" buttonSize = "btn-large">
                    Here to Learn <i className = "far-fa-play-circle"/>
                </Button>
            </div>
        </Container>
    )
}



export default HeroSection;



