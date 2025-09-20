// Дашборд аналитики
class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.data = this.generateMockData();
        this.currentPeriod = '7d';
        this.autoRefreshInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.populateTable();
        this.startAutoRefresh();
        this.animateMetrics();
    }

    setupEventListeners() {
        // Фильтры времени
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.currentPeriod = e.target.dataset.period;
                this.updateData();
            });
        });

        // Кнопка обновления
        document.getElementById('refreshData').addEventListener('click', () => {
            this.refreshData();
        });

        // Автообновление
        document.getElementById('autoRefresh').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        });

        // Поиск в таблице
        document.getElementById('searchTable').addEventListener('input', (e) => {
            this.filterTable(e.target.value);
        });

        // Сортировка таблицы
        document.getElementById('sortTable').addEventListener('change', (e) => {
            this.sortTable(e.target.value);
        });

        // Экспорт данных
        document.getElementById('exportCSV').addEventListener('click', () => {
            this.exportData('csv');
        });

        document.getElementById('exportPDF').addEventListener('click', () => {
            this.exportData('pdf');
        });

        document.getElementById('exportExcel').addEventListener('click', () => {
            this.exportData('excel');
        });
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    generateMockData() {
        const periods = {
            '7d': 7,
            '30d': 30,
            '90d': 90,
            '1y': 365
        };

        const data = {
            visitors: [],
            pageViews: [],
            avgTime: [],
            conversion: [],
            sources: {
                'Google': 45,
                'Прямой трафик': 25,
                'Социальные сети': 15,
                'Email': 10,
                'Другие': 5
            },
            devices: {
                'Desktop': 60,
                'Mobile': 35,
                'Tablet': 5
            },
            geo: {
                'Россия': 40,
                'США': 20,
                'Германия': 15,
                'Франция': 10,
                'Другие': 15
            }
        };

        const days = periods[this.currentPeriod] || 7;
        const baseDate = new Date();
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(baseDate);
            date.setDate(date.getDate() - i);
            
            data.visitors.push({
                date: date.toISOString().split('T')[0],
                value: Math.floor(Math.random() * 1000) + 500
            });
            
            data.pageViews.push({
                date: date.toISOString().split('T')[0],
                value: Math.floor(Math.random() * 3000) + 1500
            });
            
            data.avgTime.push({
                date: date.toISOString().split('T')[0],
                value: Math.floor(Math.random() * 300) + 120
            });
            
            data.conversion.push({
                date: date.toISOString().split('T')[0],
                value: (Math.random() * 5 + 2).toFixed(1)
            });
        }

        return data;
    }

    initializeCharts() {
        this.createTrafficChart();
        this.createSourcesChart();
        this.createDevicesChart();
        this.createGeoChart();
    }

    createTrafficChart() {
        const ctx = document.getElementById('trafficChart').getContext('2d');
        
        this.charts.traffic = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.visitors.map(item => {
                    const date = new Date(item.date);
                    return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                    label: 'Посетители',
                    data: this.data.visitors.map(item => item.value),
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Просмотры',
                    data: this.data.pageViews.map(item => item.value),
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ccc'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ccc'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    createSourcesChart() {
        const ctx = document.getElementById('sourcesChart').getContext('2d');
        
        this.charts.sources = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(this.data.sources),
                datasets: [{
                    data: Object.values(this.data.sources),
                    backgroundColor: [
                        '#4ecdc4',
                        '#ff6b6b',
                        '#45b7d1',
                        '#96ceb4',
                        '#feca57'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ccc',
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    createDevicesChart() {
        const ctx = document.getElementById('devicesChart').getContext('2d');
        
        this.charts.devices = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(this.data.devices),
                datasets: [{
                    data: Object.values(this.data.devices),
                    backgroundColor: [
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(69, 183, 209, 0.8)'
                    ],
                    borderColor: [
                        '#4ecdc4',
                        '#ff6b6b',
                        '#45b7d1'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ccc'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ccc'
                        }
                    }
                }
            }
        });
    }

    createGeoChart() {
        const ctx = document.getElementById('geoChart').getContext('2d');
        
        this.charts.geo = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: Object.keys(this.data.geo),
                datasets: [{
                    data: Object.values(this.data.geo),
                    backgroundColor: [
                        'rgba(78, 205, 196, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(69, 183, 209, 0.8)',
                        'rgba(150, 206, 180, 0.8)',
                        'rgba(254, 202, 87, 0.8)'
                    ],
                    borderColor: [
                        '#4ecdc4',
                        '#ff6b6b',
                        '#45b7d1',
                        '#96ceb4',
                        '#feca57'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ccc',
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ccc'
                        }
                    }
                }
            }
        });
    }

    populateTable() {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        this.data.visitors.forEach((visitor, index) => {
            const row = document.createElement('tr');
            const date = new Date(visitor.date);
            const pageView = this.data.pageViews[index];
            const avgTime = this.data.avgTime[index];
            const conversion = this.data.conversion[index];
            
            const bounceRate = (Math.random() * 30 + 20).toFixed(1);
            
            row.innerHTML = `
                <td>${date.toLocaleDateString('ru-RU')}</td>
                <td>${visitor.value.toLocaleString()}</td>
                <td>${pageView.value.toLocaleString()}</td>
                <td>${Math.floor(avgTime.value / 60)}:${(avgTime.value % 60).toString().padStart(2, '0')}</td>
                <td>${bounceRate}%</td>
                <td>${conversion.value}%</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    updateData() {
        this.data = this.generateMockData();
        this.updateMetrics();
        this.updateCharts();
        this.populateTable();
    }

    updateMetrics() {
        const totalVisitors = this.data.visitors.reduce((sum, item) => sum + item.value, 0);
        const totalPageViews = this.data.pageViews.reduce((sum, item) => sum + item.value, 0);
        const avgTime = Math.floor(this.data.avgTime.reduce((sum, item) => sum + item.value, 0) / this.data.avgTime.length);
        const avgConversion = (this.data.conversion.reduce((sum, item) => sum + parseFloat(item.value), 0) / this.data.conversion.length).toFixed(1);

        document.getElementById('visitors').textContent = totalVisitors.toLocaleString();
        document.getElementById('pageViews').textContent = totalPageViews.toLocaleString();
        document.getElementById('avgTime').textContent = `${Math.floor(avgTime / 60)}:${(avgTime % 60).toString().padStart(2, '0')}`;
        document.getElementById('conversion').textContent = `${avgConversion}%`;

        this.animateMetrics();
    }

    updateCharts() {
        if (this.charts.traffic) {
            this.charts.traffic.data.labels = this.data.visitors.map(item => {
                const date = new Date(item.date);
                return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
            });
            this.charts.traffic.data.datasets[0].data = this.data.visitors.map(item => item.value);
            this.charts.traffic.data.datasets[1].data = this.data.pageViews.map(item => item.value);
            this.charts.traffic.update();
        }
    }

    animateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(element => {
            element.style.transform = 'scale(1.1)';
            element.style.color = '#4ecdc4';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '#fff';
            }, 300);
        });
    }

    refreshData() {
        const refreshBtn = document.getElementById('refreshData');
        const icon = refreshBtn.querySelector('i');
        
        icon.style.animation = 'spin 1s linear infinite';
        
        setTimeout(() => {
            this.updateData();
            icon.style.animation = '';
        }, 1000);
    }

    startAutoRefresh() {
        this.stopAutoRefresh();
        this.autoRefreshInterval = setInterval(() => {
            this.updateData();
        }, 30000); // Обновление каждые 30 секунд
    }

    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#tableBody tr');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    sortTable(sortBy) {
        const tbody = document.getElementById('tableBody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aVal, bVal;
            
            switch(sortBy) {
                case 'date':
                    aVal = new Date(a.cells[0].textContent);
                    bVal = new Date(b.cells[0].textContent);
                    break;
                case 'visitors':
                    aVal = parseInt(a.cells[1].textContent.replace(/,/g, ''));
                    bVal = parseInt(b.cells[1].textContent.replace(/,/g, ''));
                    break;
                case 'views':
                    aVal = parseInt(a.cells[2].textContent.replace(/,/g, ''));
                    bVal = parseInt(b.cells[2].textContent.replace(/,/g, ''));
                    break;
                default:
                    return 0;
            }
            
            return bVal - aVal;
        });
        
        rows.forEach(row => tbody.appendChild(row));
    }

    exportData(format) {
        let data, filename, mimeType;
        
        switch(format) {
            case 'csv':
                data = this.generateCSV();
                filename = 'analytics-data.csv';
                mimeType = 'text/csv';
                break;
            case 'pdf':
                this.generatePDF();
                return;
            case 'excel':
                data = this.generateExcel();
                filename = 'analytics-data.xlsx';
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                break;
        }
        
        if (data) {
            const blob = new Blob([data], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    generateCSV() {
        let csv = 'Дата,Посетители,Просмотры,Время на сайте,Отказы,Конверсия\n';
        
        this.data.visitors.forEach((visitor, index) => {
            const date = new Date(visitor.date);
            const pageView = this.data.pageViews[index];
            const avgTime = this.data.avgTime[index];
            const conversion = this.data.conversion[index];
            const bounceRate = (Math.random() * 30 + 20).toFixed(1);
            
            csv += `${date.toLocaleDateString('ru-RU')},${visitor.value},${pageView.value},${Math.floor(avgTime.value / 60)}:${(avgTime.value % 60).toString().padStart(2, '0')},${bounceRate}%,${conversion.value}%\n`;
        });
        
        return csv;
    }

    generatePDF() {
        // Простая реализация PDF экспорта
        const printWindow = window.open('', '_blank');
        const content = `
            <html>
                <head>
                    <title>Аналитика - ${new Date().toLocaleDateString('ru-RU')}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #4ecdc4; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>Отчет по аналитике</h1>
                    <p>Период: ${this.currentPeriod}</p>
                    <p>Дата создания: ${new Date().toLocaleString('ru-RU')}</p>
                    <table>
                        <tr>
                            <th>Дата</th>
                            <th>Посетители</th>
                            <th>Просмотры</th>
                            <th>Время на сайте</th>
                            <th>Отказы</th>
                            <th>Конверсия</th>
                        </tr>
                        ${this.data.visitors.map((visitor, index) => {
                            const date = new Date(visitor.date);
                            const pageView = this.data.pageViews[index];
                            const avgTime = this.data.avgTime[index];
                            const conversion = this.data.conversion[index];
                            const bounceRate = (Math.random() * 30 + 20).toFixed(1);
                            
                            return `
                                <tr>
                                    <td>${date.toLocaleDateString('ru-RU')}</td>
                                    <td>${visitor.value.toLocaleString()}</td>
                                    <td>${pageView.value.toLocaleString()}</td>
                                    <td>${Math.floor(avgTime.value / 60)}:${(avgTime.value % 60).toString().padStart(2, '0')}</td>
                                    <td>${bounceRate}%</td>
                                    <td>${conversion.value}%</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </body>
            </html>
        `;
        
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    }

    generateExcel() {
        // Простая реализация Excel экспорта (CSV формат)
        return this.generateCSV();
    }
}

// Инициализация дашборда при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что мы на странице с дашбордом
    if (document.getElementById('analytics')) {
        new AnalyticsDashboard();
    }
});

// Дополнительные анимации для дашборда
class DashboardAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollAnimations();
        this.addHoverEffects();
        this.addLoadingAnimations();
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами дашборда
        document.querySelectorAll('.metric-card, .chart-container, .data-table-container, .export-section').forEach(element => {
            observer.observe(element);
        });
    }

    addHoverEffects() {
        // Эффекты при наведении на карточки метрик
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(78, 205, 196, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // Эффекты для кнопок экспорта
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addLoadingAnimations() {
        // Анимация загрузки для графиков
        document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                wrapper.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'translateY(0)';
            }, 500);
        });
    }
}

// Инициализация анимаций
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('analytics')) {
        new DashboardAnimations();
    }
});
