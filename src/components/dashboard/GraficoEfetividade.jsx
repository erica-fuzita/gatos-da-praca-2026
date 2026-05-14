import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function GraficoEfetividade({
  total,
  adotados,
}) {

   const porcentagem =
    total > 0
      ? Math.round((adotados / total) * 100)
      : 0;

  const dados = [
    { name: "Adotados", value: porcentagem },
    { name: "Restante", value: 100 - porcentagem },
  ];

  const cores = ["#4a7050", "#dfe8dc"];

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        position: "relative",
      }}
    >

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={dados}
            dataKey="value"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
          >
            {dados.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={cores[index]}
              />
            ))}
          </Pie>

        </PieChart>

      </ResponsiveContainer>

      {/* TEXTO CENTRAL */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >

        <h2
          style={{
            margin: 0,
            color: "#2e4932",
            fontSize: "32px",
          }}
        >
          {porcentagem}%
        </h2>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Taxa de adoção
        </p>

      </div>

    </div>
  );
}