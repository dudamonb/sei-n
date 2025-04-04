const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { cachedDataVersionTag } = require('v8')

operation()

function operation(){
    inquirer.prompt([
        {
             type:'list',
             name: 'action',
             message:'O que você deseja fazer baseado nessa lista?',
             choices: [
                'Criar Conta',   //ação 
                'Consultar Saldo',  //ação
                'Depositar', //ação
                'Sacar', //ação
                'Sair' ], //ação


       },
            
       ]). then((answer) => {
        const action = answer['action']  //receber a respota a partir da ação do usuário

        if(action === 'Criar Conta'){ // CONDICIO DA AÇÃO 
            createAccount()
            buildAccount()
        }
        else if(action === 'Depositar'){
            deposit()
        }
        else if(action === 'Depositar'){
            deposit()

        }else if(action === 'Consultar Saldo'){
            getAccountBalance()
        }
        else if(action === 'Sacar'){
            withdraw()

        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por utilizar o Liso Banking'))
            process.exit
        }
           
        })

            .catch(err => console.log(err))  // VERIFIFCAR OS ERROS E CORRIGIR-LOS
     }

     function createAccount(){
        console.log(chalk.bgGreen.black('Parabéns por escolher o Liso Banking!')) // informações da conta
        console.log(chalk.green('Define as opções de sua conta a seguir!')) // informações da conta
     }
     
     // código de criar uma conta em si // 
     function buildAccount() {
        inquirer.prompt([
            {
                name:'accountName',
                message: 'Digite um nome para sua conta:',
            },
        ]).then((answer) => {
            const accountName = answer['accountName']
            console.info(accountName)

            if(!fs.existsSync('accounts')){
                fs.mkdirSync('accounts')
            }

            if(fs.existsSync(`accounts/${accountName}.json`)){  // verificar a existência de forma síncrona = esquerda para direita, de cima para baixo  
                console.log(chalk.bgRed.black('Esta conta já existe, insira outro nome.'))


                buildAccount()
                return

            }
            fs.writeFileSync(
                `accounts/${accountName}.json`, '("balance: 0")',
                function(err){
                    console.log(err)
                },
            )
            console.log(chalk.green('Parabéns! você tem mais uma conta com saldo'))
            operation()     
        }).catch((err) => console.log(err))

     }

     function checkAccount(accountName){
        if(!fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Conta inexistente, tente novamente'))
            return false

        }
        return true
     }

     function addAmount(accountName, amount){
        const accountData = getAccount(accountName)

        if(!amount){
            console.log(cachedDataVersionTag)
        }
     }

     

     // criar arquivo para armazenar informação 

     function deposit(){
        inquirer.prompt([
        {
            name:'accountName',                          // nome da conta
            message: 'Qual o nome da sua conta?'
        }
       ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return deposit()
        } 

        inquirer.prompt([
            {
                name:'amount',
                message: 'Digite o valor do depósito',

            }

            .then((answer)=>{
                const amount = answer['amount']
                addAmount(accountName,amount)
                operation()

            })
            .catch((err))
          
        ])

       }).catch()

     }

     