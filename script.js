// Sistema de Autenticação
const loginForm = document.querySelector('#login-box form');
const loginBox = document.getElementById('login-box');
const content = document.getElementById('content');
const transactionForm = document.getElementById('transactionForm');

// Verificar se o usuário está logado
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        loginBox.style.display = 'block';
        content.style.display = 'none';
    } else {
        loginBox.style.display = 'none';
        content.style.display = 'block';
        loadDashboard();
    }
}

// Manipular login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulação de autenticação (em produção, use uma API real)
    if (username && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        checkAuth();
    }
});

// Gerenciamento de Transações
class Transaction {
    constructor(description, amount, type, category, date) {
        this.id = Date.now();
        this.description = description;
        this.amount = amount;
        this.type = type; // 'receita' ou 'despesa'
        this.category = category;
        this.date = date;
    }
}

// Manipular envio de nova transação
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    
    const transaction = new Transaction(description, amount, type, category, date);
    
    // Salvar transação
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Limpar formulário e atualizar dashboard
    transactionForm.reset();
    loadDashboard();
});

// Funções do Dashboard
function loadDashboard() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const dashboardContent = document.getElementById('dashboard-content');
    dashboardContent.innerHTML = ''; // Limpar conteúdo anterior
    
    updateBalance(transactions);
    updateCharts(transactions);
    updateTransactionList(transactions);
}

function updateBalance(transactions) {
    const balance = transactions.reduce((acc, transaction) => {
        return acc + (transaction.type === 'receita' ? transaction.amount : -transaction.amount);
    }, 0);
    
    const balanceElement = document.createElement('div');
    balanceElement.className = 'card mb-4';
    balanceElement.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Saldo Atual</h5>
            <h2 class="card-text ${balance >= 0 ? 'text-success' : 'text-danger'}">
                R$ ${balance.toFixed(2)}
            </h2>
        </div>
    `;
    document.getElementById('dashboard-content').appendChild(balanceElement);
}

function updateCharts(transactions) {
    const chartsContainer = document.createElement('div');
    chartsContainer.className = 'row mt-4';
    
    // Gráfico de Gastos por Categoria
    const categoryChart = document.createElement('div');
    categoryChart.className = 'col-md-6';
    categoryChart.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Gastos por Categoria</h5>
                <canvas id="categoryChart"></canvas>
            </div>
        </div>
    `;
    
    // Gráfico de Evolução do Patrimônio
    const evolutionChart = document.createElement('div');
    evolutionChart.className = 'col-md-6';
    evolutionChart.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Evolução do Patrimônio</h5>
                <canvas id="evolutionChart"></canvas>
            </div>
        </div>
    `;
    
    chartsContainer.appendChild(categoryChart);
    chartsContainer.appendChild(evolutionChart);
    document.getElementById('dashboard-content').appendChild(chartsContainer);
    
    // Dados para os gráficos
    const categoryData = {};
    const evolutionData = {};
    
    transactions.forEach(transaction => {
        // Agrupar por categoria
        if (transaction.type === 'despesa') {
            categoryData[transaction.category] = (categoryData[transaction.category] || 0) + transaction.amount;
        }
        
        // Agrupar por data
        const date = transaction.date;
        evolutionData[date] = (evolutionData[date] || 0) + (transaction.type === 'receita' ? transaction.amount : -transaction.amount);
    });
    
    // Gráfico de Categorias
    new Chart(document.getElementById('categoryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Gráfico de Evolução
    new Chart(document.getElementById('evolutionChart'), {
        type: 'line',
        data: {
            labels: Object.keys(evolutionData).sort(),
            datasets: [{
                label: 'Patrimônio',
                data: Object.values(evolutionData),
                borderColor: '#36A2EB',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateTransactionList(transactions) {
    const listContainer = document.createElement('div');
    listContainer.className = 'card mt-4';
    listContainer.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Últimas Transações</h5>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.slice(-5).reverse().map(transaction => `
                            <tr>
                                <td>${new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                                <td>${transaction.description}</td>
                                <td>${transaction.category}</td>
                                <td><span class="badge ${transaction.type === 'receita' ? 'badge-success' : 'badge-danger'}">${transaction.type}</span></td>
                                <td class="${transaction.type === 'receita' ? 'text-success' : 'text-danger'}">
                                    R$ ${transaction.amount.toFixed(2)}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('dashboard-content').appendChild(listContainer);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});