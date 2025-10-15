import * as readline from 'readline'; 

class App {
  getUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question('덧셈할 문자열을 입력하세요. \n', (input) => {
        rl.close();
        resolve(input.trim());
      });
    });
  }
  async run() {
    const userInputData = await this.getUserInput();

  }

}

export default App;
