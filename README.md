# performanceK6-Docker
Projeto dedicado a realizar testes de performance com K6, dashboard e docker

[Tipos de Teste](https://grafana.com/docs/k6/latest/testing-guides/test-types/)

[Docker](https://docs.docker.com/guides/)

[Instalação k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

[Documentação API](https://fakestoreapi.com/docs)

[Documentação Web](https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/)

[Artigo dashboard](https://pedrohjmartins.medium.com/teste-de-carga-com-k6-integração-com-docker-compose-influxdb-grafana-b35d9dbf5d6e)

[Artigo em inglês dashboard](https://medium.com/swlh/beautiful-load-testing-with-k6-and-docker-compose-4454edb3a2e3)

### Rodando o Teste com Docker Compose

Estrutura de pasta 

```
project-root/
├── docker-compose.yml
└── scripts
    └── GetAllProducts.js
```
Certifique-se de que a estrutura de pastas esteja correta conforme ilustrado acima. Navegue até o diretório raiz do seu projeto onde o arquivo docker-compose.yml está localizado. Execute o Docker Compose:

```
docker-compose up
```

Rodando um Teste Específico
Se você quiser rodar um script específico sem alterar o docker-compose.yml, use o comando docker-compose run:


```
docker-compose run k6 run /scripts/GetAllProducts.js
```

### Erros 

**Docker**

```
Please try shutting WSL down (wsl --shutdown) and/or rebooting your computer. If not sufficient, WSL may need to be reinstalled fully. As a last resort, try to uninstall/reinstall Docker Desktop.
```

[Link do forum](https://forums.docker.com/t/an-unexpected-error-was-encountered-while-executing-a-wsl-command/137525/8)

```
I got the same problem while try to install docker desktop.
So in my case, I install docker and login while WSL is out of date then I follow the above comment

enableing BIOS SVM mode ( gg your self :)) )
restart and open docker, if it got that error “starting wsl engine 2 errors occurred . . .”
open cmd admin and check wsl status:
wsl --status
you will see:
Default Distribution: docker-desktop (in my case this is :docker-desktop-data)
Default Version: 2
wsl --unregister docker-desktop 
open docker again.
hope that help .
```