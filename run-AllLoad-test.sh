# Inicializa os serviços InfluxDB e Grafana
docker-compose up -d influxdb grafana

# Espera um tempo para garantir que os serviços estejam totalmente inicializados
echo "Aguardando a inicialização dos serviços..."
sleep 10

echo "--------------------------------------------------------------------------------------"
echo "Load testing com Grafana dashboard http://localhost:3000/d/k6/qualiters-club-k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"

# Define uma flag para parar o script em caso de erro
set -e

# Percorre todos os arquivos .js na pasta /__test__/API e executa cada um
for file in $(ls __test__/API/*.js); do
    echo "Executando teste $(basename $file)"
    docker-compose run --rm k6 run /scripts/$(basename $file)
done

# Encerra os serviços após a execução dos testes
docker-compose down