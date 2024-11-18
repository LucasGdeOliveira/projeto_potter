//Lucas
// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Configuração das cores das casas
    const coresCasas = {
        'Grifinória': '#740001',
        'Sonserina': '#1a472a',
        'Corvinal': '#0e1a40',
        'Lufa-Lufa': '#ecb939'
    };

    // Configuração comum para todos os gráficos
    const configComum = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    };

    // Gráfico de Pontuação por Casa
    const ctxPontos = document.getElementById ('pontosQuadribolChart').getContext('2d');
    new Chart(ctxPontos, {
        type: 'bar',
        data: {
            labels: dados_quadribol.casas,
            datasets: [{
                label: 'Pontos',
                data: dados_quadribol.pontos,
                backgroundColor: dados_quadribol.casas.map(casa => coresCasas[casa]),
                borderWidth: 1
            }]
        },
        options: {
            ...configComum,
            plugins: {
                title: {
                    display: true,
                    text: 'Pontuação Total por Casa'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Pontos'
                    }
                }
            }
        }
    });

    // Gráfico de Vitórias por Time
    const ctxVitorias = document.getElementById('vitoriasChart').getContext('2d');
    new Chart(ctxVitorias, {
        type: 'doughnut',
        data: {
            labels: dados_quadribol.casas,
            datasets: [{
                data: dados_quadribol.vitorias,
                backgroundColor: dados_quadribol.casas.map(casa => coresCasas[casa]),
                borderWidth: 1
            }]
        },
        options: {
            ...configComum,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Vitórias'
                }
            }
        }
    });

    // Gráfico de Capturas do Pomo
    const ctxPomo = document.getElementById('pomoChart').getContext('2d');
    new Chart(ctxPomo, {
        type: 'radar',
        data: {
            labels: dados_quadribol.casas,
            datasets: [{
                label: 'Capturas do Pomo',
                data: dados_quadribol.pomos,
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                borderColor: 'rgba(255, 215, 0, 1)',
                borderWidth: 2,
                pointBackgroundColor: dados_quadribol.casas.map(casa => coresCasas[casa]),
            }]
        },
        options: {
            ...configComum,
            plugins: {
                title: {
                    display: true,
                    text: 'Capturas do Pomo de Ouro'
                }
            },
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });

    // Criar tabela de estatísticas
    const tabelaDiv = document.getElementById('tabelaCampeonato');
    let tabelaHTML = `
        <table class="stats-table">
            <thead>
                <tr>
                    <th>Casa</th>
                    <th>Pontos</th>
                    <th>Vitórias</th>
                    <th>Pomos</th>
                </tr>
            </thead>
            <tbody>
    `;

    dados_quadribol.casas.forEach((casa, index) => {
        tabelaHTML += `
            <tr>
                <td style="color: ${coresCasas[casa]}">${casa}</td>
                <td>${dados_quadribol.pontos[index]}</td>
                <td>${dados_quadribol.vitorias[index]}</td>
                <td>${dados_quadribol.pomos[index]}</td>
            </tr>
        `;
    });

    tabelaHTML += `
            </tbody>
        </table>
    `;
    
    tabelaDiv.innerHTML = tabelaHTML;
});