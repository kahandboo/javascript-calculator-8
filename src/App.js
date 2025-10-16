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
        if (input.trim().length == 0) resolve("0");
        else resolve(input.trim());
      });
    });
  }

  /**
   * 입력 문자열에서 커스텀 구분자를 찾아낸다.
   * 커스텀 구분자가 존재하지 않는 경우엔 원본 문자열을 그대로 반환한다.
   */
  parseCustomSeparator(userInputData) {
    if (userInputData.length < 5) {
      return {
        separator: "",
        string: userInputData
      };
    }

    if (userInputData[0] !== '/' || userInputData[1] !== '/') {
      this.handleUnexpectedInput(); 
    }
    
    if (userInputData[3] !== '\\' || userInputData[4] !== 'n') {
      this.handleUnexpectedInput(); 
    }
    
    const customSeparator = userInputData[2];
    const leftOver = userInputData.substring(5); 
    
    return {
      separator: customSeparator,
      string: leftOver
    };
  }

  handleUnexpectedInput() {
    console.log("[ERROR]");
  }

  async run() {
    const userInputData = await this.getUserInput();
    const parsedInputData = this.parseCustomSeparator(userInputData);
    
  }

}

export default App;
