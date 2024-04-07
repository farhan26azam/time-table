import Table from "../components/Table.jsx";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import {BASE_URL} from "../utils/config.js";
import {useEffect, useState} from "react";
import {list} from "postcss";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Dashboard = () => {

    const [minHour, setMinHour] = useState(0);
    const [maxHour, setMaxHour] = useState(0);
    const [loading, setLoading] = useState(true);
    let list = [];
    // 2D array of size 7x(maxHour-minHour+1)
    // eslint-disable-next-line no-unused-vars
    const [appointments, setAppointments] = useState(Array.from({ length: 7 }, (_, i) => Array(maxHour - minHour + 1).fill(list)));
    console.log(appointments);
    useEffect(() => {
        axios.get(`${BASE_URL}/appointments`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            setMinHour(response.data.MIN_HOUR);
            setMaxHour(response.data.MAX_HOUR);
            // eslint-disable-next-line no-unused-vars
            let appointments = Array.from({ length: 7 }, (_, i) => Array(response.data.MAX_HOUR - response.data.MIN_HOUR + 1).fill(null));
            Object.keys(response.data).forEach(key => {
                if(key!== "MIN_HOUR" && key!== "MAX_HOUR"){
                    let duration = stringTimeToNumber(response.data[key]?.endTimeFormatted) - stringTimeToNumber(response.data[key]?.startTimeFormatted);
                    console.log(duration);
                    response.data[key] = {...response?.data[key], duration: duration};
                    appointments[getWeekDayIndex(response?.data[key]?.weekDay)][stringTimeToNumber(response.data[key]?.startTimeFormatted)-response.data.MIN_HOUR]=response.data[key];
                }
            })
            setAppointments(appointments);
        }).catch(error => {
            alert("Token expired! Refresh")
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
    return (
        <div className="">
            <Navbar/>
            <div className="mx-10 my-10">
                <Table loading={loading} appointments={appointments} minHour={minHour} maxHour={maxHour}/>
            </div>
        </div>
    )
};

function getWeekDayIndex(day) {
    return weekdays.indexOf(day);
}
function stringTimeToNumber(time) {
    let hour = 0;
    if (typeof time !== "undefined" && time?.includes(" ")){
        if(time == "12 PM"){
            return 12;
        }else if(time == "12 AM"){
            return 0;
        }
        let timeArray = time?.split(" ");
         hour = parseInt(timeArray[0]);
         if(timeArray[1]=== "PM"){
             hour+=12;
         }
    }
    return hour;
}

export default Dashboard;
