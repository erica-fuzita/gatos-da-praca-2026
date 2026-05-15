import { useEffect, useState } from "react";
import "./CardsResumo.css";

import {
  PawPrint,
  Users,
  HeartHandshake,
  Cat,
  CheckCircle,
  PiggyBank
} from "lucide-react";

export default function CardsResumo({ dados }) {
  const [animados, setAnimados] = useState({
    totalGatos: 0,
    disponiveis: 0,
    adotados: 0,
    solicitacoes: 0,
    voluntarios: 0,
    doacoes: 0, // 🔥 novo campo SEM quebrar nada
  });

  useEffect(() => {
    const duracao = 800;
    const steps = 30;

    const animar = (campo, valorFinal) => {
      let passo = 0;
      const incremento = valorFinal / steps;

      const interval = setInterval(() => {
        passo++;

        setAnimados((prev) => ({
          ...prev,
          [campo]: Math.round(incremento * passo),
        }));

        if (passo >= steps) clearInterval(interval);
      }, duracao / steps);
      return interval;
    };

    const intervals = [
    animar("totalGatos", dados.totalGatos),
    animar("disponiveis", dados.disponiveis),
    animar("adotados", dados.adotados),
    animar("solicitacoes", dados.solicitacoes),
    animar("voluntarios", dados.voluntarios || 0),   
    // 🔥 Valor fictício de doações
    animar("doacoes", 1250), // R$ 1.250,00
    ];

      return () => {
    intervals.forEach(clearInterval);
  };
  
  }, [dados]);

  return (
    <div className="cards-grid">

      <div className="card-resumo">
        <Cat className="icon" />
        <h3>Total de Gatos</h3>
        <p>{animados.totalGatos}</p>
      </div>

      <div className="card-resumo">
        <PawPrint className="icon" />
        <h3>Disponíveis</h3>
        <p>{animados.disponiveis}</p>
      </div>

      <div className="card-resumo">
        <CheckCircle className="icon" />
        <h3>Adotados</h3>
        <p>{animados.adotados}</p>
      </div>

      <div className="card-resumo">
        <HeartHandshake className="icon" />
        <h3>Solicitações</h3>
        <p>{animados.solicitacoes}</p>
      </div>
{/*
      <div className="card-resumo">
        <Users className="icon" />
        <h3>Voluntários</h3>
        <p>{animados.voluntarios}</p>
      </div>

      {/* 🔥 NOVO CARD DE DOAÇÕES 
      <div className="card-resumo doacoes">
        <PiggyBank className="icon" />
        <h3>Doações (R$)</h3>
        <p>{animados.doacoes.toLocaleString("pt-BR")}</p>
      </div>
                  */}
    </div>
  );
}
