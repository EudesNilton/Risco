const times = ["Facção", "Racionais", "Sabotage", "Planet Hemp"];

const partidas = [
  ["Facção", "Racionais", "A_B_1", "A_B_2"],
  ["Facção", "Sabotage", "A_C_1", "A_C_2"],
  ["Facção", "Planet Hemp", "A_D_1", "A_D_2"],
  ["Racionais", "Sabotage", "B_C_1", "B_C_2"],
  ["Racionais", "Planet Hemp", "B_D_1", "B_D_2"],
  ["Sabotage", "Planet Hemp", "C_D_1", "C_D_2"]
];

// Atualiza a tabela sempre que algum input mudar
partidas.forEach(([t1, t2, id1, id2]) => {
  document.getElementById(id1).addEventListener("input", atualizarTabela);
  document.getElementById(id2).addEventListener("input", atualizarTabela);
});

function atualizarTabela() {
  const tabela = {};
  times.forEach(time => {
    tabela[time] = { j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0, pts: 0 };
  });

  partidas.forEach(([t1, t2, id1, id2]) => {
    const g1 = document.getElementById(id1).value;
    const g2 = document.getElementById(id2).value;

    // Se os dois campos estiverem preenchidos
    if (g1 !== "" && g2 !== "") {
      const gols1 = parseInt(g1);
      const gols2 = parseInt(g2);

      tabela[t1].j++;
      tabela[t2].j++;
      tabela[t1].gp += gols1;
      tabela[t2].gp += gols2;
      tabela[t1].gc += gols2;
      tabela[t2].gc += gols1;

      if (gols1 > gols2) {
        tabela[t1].v++;
        tabela[t2].d++;
        tabela[t1].pts += 3;
      } else if (gols2 > gols1) {
        tabela[t2].v++;
        tabela[t1].d++;
        tabela[t2].pts += 3;
      } else {
        tabela[t1].e++;
        tabela[t2].e++;
        tabela[t1].pts++;
        tabela[t2].pts++;
      }

      tabela[t1].sg = tabela[t1].gp - tabela[t1].gc;
      tabela[t2].sg = tabela[t2].gp - tabela[t2].gc;
    }
  });

  const classif = Object.entries(tabela).sort((a, b) => {
    if (b[1].pts !== a[1].pts) return b[1].pts - a[1].pts;
    if (b[1].v !== a[1].v) return b[1].v - a[1].v;
    return b[1].sg - a[1].sg;
  });

  const body = document.getElementById("tabelaBody");
  body.innerHTML = "";

  classif.forEach(([time, stats]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${time}</td>
      <td>${stats.j}</td>
      <td>${stats.v}</td>
      <td>${stats.e}</td>
      <td>${stats.d}</td>
      <td>${stats.gp}</td>
      <td>${stats.gc}</td>
      <td>${stats.sg}</td>
      <td>${stats.pts}</td>
    `;
    body.appendChild(tr);
  });
}
