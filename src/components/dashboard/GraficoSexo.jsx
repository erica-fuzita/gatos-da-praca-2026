import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function GraficoSexo({ gatos }) {

 const machos = gatos.filter(
  (g) => g.sexo?.toLowerCase() === "macho"
).length;

const femeas = gatos.filter(
  (g) => g.sexo?.toLowerCase() === "fêmea"
).length;

  const dados = [
    { sexo: "Machos", total: machos },
    { sexo: "Fêmeas", total: femeas },
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#b7cbb2"
          />

          <XAxis dataKey="sexo" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#4a7050"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}