import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import DashboardSection from "../../components/dashboard/DashboardSection";
import CardsResumo from "../../components/dashboard/CardsResumo";
import GraficoPizza from "../../components/dashboard/GraficoPizza";
import GraficoLinha from "../../components/dashboard/GraficoLinha";
import GraficoSexo from "../../components/dashboard/GraficoSexo";
import GraficoEfetividade from "../../components/dashboard/GraficoEfetividade";
import IndicadoresMensais from "../../components/dashboard/IndicadoresMensais";

export default function DashboardHome() {
  const [gatos, setGatos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    async function carregar() {
      const snapGatos = await getDocs(collection(db, "gatos"));
      setGatos(snapGatos.docs.map((d) => ({ id: d.id, ...d.data() })));

      const snapSolic = await getDocs(collection(db, "adocao-solicitacoes"));
      setSolicitacoes(snapSolic.docs.map((d) => ({ id: d.id, ...d.data() })));

      const snapVol = await getDocs(collection(db, "voluntarios"));
      setVoluntarios(snapVol.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    carregar();
  }, []);

  const total = gatos.length || 24;
  const adotados = gatos.filter((g) => g.status_adocao?.toLowerCase() === "Adotado").length || 9;
  const disponiveis = total - adotados;

  return (
    <div>
      {/* VISÃO GERAL */}
      <DashboardSection title="📌 Visão Geral">
        <CardsResumo
          dados={{
            totalGatos: total,
            disponiveis,
            adotados,
            solicitacoes: solicitacoes.length,
          }}
        />
      </DashboardSection>

      <DashboardSection title="📊 Visão Geral de Adoção">

  <div className="graficos-grid">

    <div className="grafico-card grande">
      <h3>Evolução das Adoções</h3>
      <GraficoLinha />
    </div>
            
    <div className="grafico-card">
      <h3>Total de Gatos</h3>
      <GraficoPizza
        disponiveis={disponiveis}
        adotados={adotados} 
        />
    </div>
 
    <div className="grafico-card">
      <h3>Sexo dos Gatos</h3>
      <GraficoSexo gatos={gatos}/>
    </div>

    <div className="grafico-card">
  <h3>Efetividade de Adoção</h3>

  <GraficoEfetividade
    total={total}
    adotados={adotados}
  />
</div>

  </div>

</DashboardSection>
    </div>
  );
}
