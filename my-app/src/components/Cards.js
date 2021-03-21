import React from 'react'
import CardItem from './CardItem'
import "./Cards.css";

function Cards() {
    return (
        <div className = "cards">
            <h1> Check out these lessons</h1>
            <div className = "cards__container">
                <ul className = "cards__items">
                    <CardItem 
                        src = "./images/img-9.jpg"
                        text = "How Codi will help you grow your coding skills"
                        label = "learn more"
                        path = "/learn-more"
                    />
                </ul>
            </div>   
        </div>
    )
}

export default Cards;