import { Command } from 'commander';
import { translate } from '@vitalets/google-translate-api';
import ora from 'ora';
import chalk from 'chalk';

// Inicializando o commander
const program = new Command();

// Configuração das opções do programa
program
  .version('1.0.0')
  .description('CLI para traduzir textos para diferentes idiomas usando a API Google Translate')
  .requiredOption('-t, --text <text>', 'Texto a ser traduzido')
  .requiredOption('-l, --language <language>', 'Língua para a qual o texto será traduzido (ex: pt, en, es, fr, de)')
  .option('-s, --source <source>', 'Língua de origem (opcional, padrão: auto)', 'auto');

// Função principal para tradução
const runTranslation = async (text, to, from) => {
  // Iniciando o loading spinner
  const spinner = ora(chalk.blue('Traduzindo o texto...')).start();

  try {
    const res = await translate(text, { to, from });
    
    // Parando o spinner com sucesso
    spinner.succeed(chalk.green('Tradução completa!'));
    console.log(chalk.yellow(`Tradução [${chalk.cyan(from)} -> ${chalk.cyan(to)}]:`));
    console.log(res.text);
  } catch (error) {
    // Parando o spinner em caso de erro
    spinner.fail(chalk.red('Erro ao traduzir o texto'));
    console.error(chalk.red('Erro ao traduzir o texto:'), chalk.red(error.message));
  }
};

// Processar as opções e argumentos
program.action((options) => {
  const { text, language, source } = options;
  runTranslation(text, language, source);
});

// Parsing dos argumentos da CLI
program.parse(process.argv);
