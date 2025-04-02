const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

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

        if(action === 'Criar Conta'){ 
            createAccount()
        }
       })
       .catch(err => console.log(err))  
     }

     function createAccount(){
        console.log(chalk.bgGreen.black('Parabéns por escolher o Liso Banking!'))
        console.log(chalk.green('Define as opções de sua conta a seguir!'))
     }
     