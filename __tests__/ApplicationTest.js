import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기", () => {
  describe("예외 테스트", () => {  
    test("음수가 포함", async () => {
      const inputs = ["-1,2,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("숫자가 아닌 문자가 포함", async () => {
      const inputs = ["a,b,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("문자열 시작이 '//'가 아님", async () => {
      const inputs = ["/?\n1,2,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("구분자 뒤에 '\\n'이 없음", async () => {
      const inputs = ["//?n1,2,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("커스텀 구분자로 빈 문자열 지정", async () => {
      const inputs = ["//\n1,2,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });
});
