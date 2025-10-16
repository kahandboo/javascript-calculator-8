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

  /**
   * 구분자를 기준으로 입력 문자열을 분리한다.
   * 분리한 문자를 숫자로 변환 후 배열에 저장해 반환한다.
   */
  splitBySeperator(string, separators) {
    let numbers = []

    for (let idx=0; idx<string.length; idx++) {
      const curr = string[idx];

      if (isNaN(curr)) {
        if (!separators.includes(curr)) {
          this.handleUnexpectedInput();
        } else {
          continue
        }
      } else {
        const number = Number(curr);
        
        if (number < 0) {
          this.handleUnexpectedInput();
        }

        numbers.push(number);
      }
    }

    return numbers;
  }

  handleUnexpectedInput() {
    throw new Error("[ERROR] 잘못된 입력입니다.");
  }

  async run() {
    const userInputData = await this.getUserInput();
    const parsedInputData = this.parseCustomSeparator(userInputData);

    let separators = [',', ':'];
    separators.push(parsedInputData.separator);

    const numbers = this.splitBySeperator(parsedInputData.string, separators);

    console.log(numbers);
  }

}

export default App;
