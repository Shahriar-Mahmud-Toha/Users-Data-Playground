import { useContext, useMemo } from "react";
import UserContext from "../../context/UserContext";
import { GENDER_COLORS } from "../../utils/constants";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import Loader from "../common/Loader";

const GenderComparison = () => {
    const { users } = useContext(UserContext);

    const genderData = useMemo(() => {
        const maleCount = users.filter(user => user.gender === "male").length;
        const femaleCount = users.filter(user => user.gender === "female").length;
        const total = users.length;

        return [
            { name: "Male", value: parseFloat(((maleCount / total) * 100).toFixed(2)) },
            { name: "Female", value: parseFloat(((femaleCount / total) * 100).toFixed(2)) }
        ];
        
    }, [users]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-lg font-semibold mb-4">Gender Distribution (%)</span>
            <Loader />
            <PieChart width={300} height={300}>
                <Pie data={genderData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    formatter={(value, entry, index) => (
                        <span className="font-semibold text-sm">{value}</span>
                    )}
                />
            </PieChart>
        </div>
    );
};

export default GenderComparison;