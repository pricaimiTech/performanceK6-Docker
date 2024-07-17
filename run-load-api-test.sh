
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

# Executa os testes de performance
echo "Executando teste GetAllProducts.js"
docker-compose run --rm k6 run /scripts/GetAllProducts.js

echo "Executando teste AddNewProduct.js"
docker-compose run --rm k6 run /scripts/AddNewProduct.js

echo "Executando teste UpdateAProduct.js"
docker-compose run --rm k6 run /scripts/UpdateAProduct.js

echo "Executando teste DeleteAProduct.js"
docker-compose run --rm k6 run /scripts/DeleteAProduct.js

# Encerra os serviços após a execução dos testes
docker-compose down --rmi all
