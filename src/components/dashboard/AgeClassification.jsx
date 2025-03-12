import { useContext, useMemo } from "react";
import UserContext from "../../context/UserContext";
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from "recharts";
import Loader from "../common/Loader";

const AgeClassification = () => {
    const { users } = useContext(UserContext);

    const ageData = useMemo(() => {
        const ageGroups = {
            "0-18": 0, "19-30": 0, "31-45": 0, "46-60": 0, "60+": 0
        };

        users.forEach(user => {
            const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
            if (age <= 18) ageGroups["0-18"]++;
            else if (age <= 30) ageGroups["19-30"]++;
            else if (age <= 45) ageGroups["31-45"]++;
            else if (age <= 60) ageGroups["46-60"]++;
            else ageGroups["60+"]++;
        });

        return Object.entries(ageGroups).map(([ageRange, count]) => ({
            ageRange,
            count
        }));
    }, [users]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-center mb-4">Age Group Comparison</span>
            <Loader />
            <BarChart width={270} height={290} data={ageData}
                margin={{
                    top: -1,
                    right: -8,
                    left: -12,
                    bottom: 13,
                }}
                barSize={35}
            >
                <XAxis dataKey="ageRange" scale="point" padding={{ left: 25, right: 19 }}>
                    <Label value="Age Group" offset={-8} position="insideBottom" />
                </XAxis>
                <YAxis>
                    <Label value="Number of People" position="insideLeft" dy={70} dx={15} angle={-90} />
                </YAxis>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#8884d8" background={{ fill: '#15191E' }} />
            </BarChart>
        </div>
    );
};

export default AgeClassification;