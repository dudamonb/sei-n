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

        ]) .then((answer)=>{
                const amount = answer['amount']
                addAmount(accountName,amount)
                operation()

            })
            .catch((err) => console.log(err))
          
      

       }).catch()

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
            console.log("Ocorreu um erro,digite um valor!")
            return deposit()
        }
        accountData.balance = parseFloat(amount) + parseFloat (accountData.balance)

        fs.writeFileSynic(
            `acconts/${accountData}`,
            function(err){
                console.log(err)
            },
        )
        console.log(chalk.green`Depositar no valor de R$${amount}, realizado com sucesso!`)
     }

     }
     function getAccount(accountName){
        const accountJson = fs.readFileSync(`account/${accountName}.json`,
        {
            encoding: 'utf-8',
            flag:'r'
        })
        return JSON.parse(accountJson)
        
    }

    function getAccountBalance(){
        inquirer.prompt([
        {
            name:'accountName',
            message: 'Qual o nome da sua conta',

        }
    ]).then((answer) => {
        const accountName = answer [`account`]
         if(!checkAccount(accountName)){
            return getAccountBalance
         }
         const accountData = getAccount(accountName)
         console.log(chalk.bgBlue.black(`Olá, o saldo de sua conta é de R$${accountData.balance}`
         ))
         operation()
        }).catch(err => console)
         
    }

    
function withdrawAmount(accountName, amount){
    const accountData = getAccount(accountName)
    
        if (!amount) {
            console.log("Ocorreu um erro, digite um valor numérico!")
            return withdraw()
        }
    
        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    
        fs.writeFileSync(`accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (erro) {
                console.log(erro)
            }
        )
        console.log(chalk.green(`Saque no valor de R$${amount}, realizado com sucesso!`))
    }
    
    
    function withdraw(){
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta',
            }
        ]).then((answer) => {
            const accountName = answer['accountName']
            if (!checkAccount(accountName)) {
                return withdraw()
            }
        
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Digite o valor do saque',
                },
            ]).then((answer) => {
                const amount = answer['amount']
                withdrawAmount(accountName, amount)
                operation()
            }).catch((erro) => console.log(erro))
    
        }).catch((erro) => console.log(erro))
    
    }
    
    



        

    
        