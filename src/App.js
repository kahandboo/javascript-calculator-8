import { Console } from "@woowacourse/mission-utils";

class App {
  /**
   * 입력 문자열에서 커스텀 구분자를 찾아낸다.
   * 커스텀 구분자가 존재하지 않는 경우엔 원본 문자열을 그대로 반환한다.
   */
  parseCustomSeparator(userInputData) {
    // 숫자, 빈 문자열, ',', ':' 로 시작하면 그대로 반환
    if (/^(\d|,|:|$)/.test(userInputData)) { 
      return {
        separator: "",
        string: userInputData
      }
    }

    const customPattern = /^\/\/(.)\\n(.*)$/; 

    if (!customPattern.test(userInputData)) {
      this.handleUnexpectedInput("커스텀 구분자 형식이 잘못됐습니다.");
    }
    
    const match = userInputData.match(customPattern);

    if (match) {
      const [, customSeparator, leftOver] = match;
      
      return {
        separator: customSeparator,
        string: leftOver
      };
    }
  }

  /**
   * 구분자를 기준으로 입력 문자열을 분리한다.
   * 분리한 문자를 숫자로 변환하여 반환한다.
   */
  splitBySeperator(string, separators) {
    const regex = new RegExp('[' + separators.join('') + ']+');
    const parts = string.split(regex);

    const numbers = parts.map(part => {
      const num = Number(part);
    
      if (isNaN(num)) {
        this.handleUnexpectedInput("구분자와 숫자가 아닌 문자는 입력할 수 없습니다.");
      }
    
      if (num < 0) {
        this.handleUnexpectedInput("음수는 입력할 수 없습니다.");
      }
    
      return num; 
    });

    return numbers;
  }

  /**
   * 숫자의 합산 결과를 반환한다.
   */
  sumNumbers(numbers) {
    const result = numbers.reduce((acc, curr) => acc + curr, 0);
    return result;
  }

  printResult(result) {
    Console.print(`결과 : ${result}`);
  }

  handleUnexpectedInput(message) {
    throw new Error("[ERROR]" + message);
  }

  async run() {
    const userInputData = await Console.readLineAsync("덧셈할 문자열을 입력하세요.\n");
    const parsedInputData = this.parseCustomSeparator(userInputData);

    let separators = [',', ':'];
    separators.push(parsedInputData.separator);

    const numbers = this.splitBySeperator(parsedInputData.string, separators);
    const result = this.sumNumbers(numbers);

    this.printResult(result);
  }

}

export default App;