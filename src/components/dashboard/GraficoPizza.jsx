import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraficoPizza({ disponiveis, adotados }) {
  const dados = [
    { name: "Disponíveis", value: disponiveis },
    { name: "Adotados", value: adotados },
  ];

  const cores = ["#2e4932", "#e39622"];
  console.log("Dados do gráfico:", dados);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width= "100%" height= "100%">
        <PieChart>
          <Pie
            data={dados}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={4}
            label
          >
            {dados.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
