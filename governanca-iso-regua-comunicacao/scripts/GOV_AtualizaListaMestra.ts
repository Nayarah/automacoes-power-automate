/**
 * GOV_AtualizaListaMestra
 *
 * Office Script chamado pelo fluxo GOV-03 (ação "Run script" do Excel Online).
 * Atualiza a tabela "ListaMestra" com as decisões dos gestores:
 *   - "Confirmado": grava a nova data na coluna "Data da última validação";
 *   - "Cancelado":  grava "Cancelado" na coluna "Status".
 *
 * Atualiza TODAS as linhas com o mesmo código (versões do documento em outros
 * idiomas), o que a ação padrão "Atualizar uma linha" do Excel não faz.
 *
 * Parâmetro de entrada (texto JSON):
 *   [{"codigo":"PRO-01-XXX-001","acao":"Confirmado","data":"2026-10-26"}]
 *
 * Retorno (texto JSON):
 *   {"atualizados":[...], "naoEncontrados":[...]}  ou  {"erro":"..."}
 */
function main(workbook: ExcelScript.Workbook, atualizacoes: string): string {
  const lista: { codigo: string; acao: string; data: string }[] = JSON.parse(atualizacoes);
  const tabela = workbook.getTable("ListaMestra");
  if (!tabela) {
    return JSON.stringify({ erro: "Tabela ListaMestra não encontrada" });
  }

  // Normaliza cabeçalhos (quebras de linha e espaços extras) e códigos (sem espaços).
  const norm = (t: string) => String(t ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  const limpaCod = (c: string) => String(c ?? "").replace(/[\s ]/g, "").toUpperCase();

  const cab = tabela.getHeaderRowRange().getValues()[0].map(h => norm(String(h)));
  const iCod = cab.indexOf("código");
  const iVal = cab.indexOf("data da última validação");
  const iSta = cab.indexOf("status");
  if (iCod < 0 || iVal < 0 || iSta < 0) {
    return JSON.stringify({ erro: "Colunas não encontradas", cabecalho: cab });
  }

  const corpo = tabela.getRangeBetweenHeaderAndTotal();
  const valores = corpo.getValues();
  const atualizados: string[] = [];
  const naoEncontrados: string[] = [];

  for (const a of lista) {
    const alvo = limpaCod(a.codigo);
    let achou = false;
    for (let r = 0; r < valores.length; r++) {
      if (limpaCod(String(valores[r][iCod])) === alvo) {
        achou = true;
        if (a.acao === "Confirmado") {
          // Converte a data ISO para o número de série do Excel (mantém a formatação da célula).
          const d = new Date(a.data + "T00:00:00Z");
          const serial = (d.getTime() - Date.UTC(1899, 11, 30)) / 86400000;
          corpo.getCell(r, iVal).setValue(serial);
        } else if (a.acao === "Cancelado") {
          corpo.getCell(r, iSta).setValue("Cancelado");
        }
      }
    }
    if (achou) { atualizados.push(a.codigo); } else { naoEncontrados.push(a.codigo); }
  }
  return JSON.stringify({ atualizados, naoEncontrados });
}