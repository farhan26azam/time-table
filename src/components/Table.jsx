import CachedIcon from '@mui/icons-material/Cached';
import {BASE_URL} from "../utils/config.js";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const Cell = ({ appointment }) => (
        appointment ? (
            <td className={`border px-2 py-2 bg-[var(--blue-theme)] leading-4`}>
                <span className="font-bold tet-sm">{appointment?.name}</span><br/>
                <span className="text-xs">{appointment?.reason}</span>
            </td>
        ):(
            <td className="border px-2 py-2 text-xs"></td>
        )
);

// eslint-disable-next-line react/prop-types
const Table = ({loading, appointments, minHour, maxHour}) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeFrames = Array.from({ length: maxHour - minHour + 1 }, (_, i) => i + minHour);

    const handleRefresh = () => {
        axios.post(`${BASE_URL}/refresh-token`,{},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            localStorage.setItem('token', response.data.newToken);
        }).catch(error => {
            alert("Token expired!")
            console.error(error);

        });
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th className="bg-gray-50">
                        <button onClick={
                            handleRefresh
                        }>
                            <CachedIcon sx={{
                            color: 'var(--green-theme)',
                        }}/>
                        </button>
                    </th>
                    {timeFrames.map((time, index) => (
                        <th key={index} className="px-1 py-1 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {time < 10 ? `0${time}:00` : `${time}:00`}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {!loading && appointments ? appointments?.map((dayAppointments, index) => (
                    <tr key={index}>
                        <td className="px-1 py-2 bg-gray-50">{daysOfWeek[index]}</td>
                        {dayAppointments?.map((appointment, i) => (
                            <Cell key={i} appointment={appointment} />
                        ))}
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={timeFrames.length + 1} className="px-6 py-3 bg-gray-50 text-center">Loading...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

