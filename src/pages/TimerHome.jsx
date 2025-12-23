
import React from "react";
import Header from "../components/Header.jsx";
import Timer from "../components/Timer.jsx";

export default function TimerHome() {
    return (
        <>
            <Header />
            <Timer isTeacher={true}/>
        </>
    )
}