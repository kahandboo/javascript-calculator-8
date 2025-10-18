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
    test("음수가 포함된 경우", async () => {
      const inputs = ["-1,2,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("숫자가 아닌 문자가 포함된 경우", async () => {
      const inputs = ["a,b,c"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("구분자 사이에 빈 문자열이 위치하는 경우", async () => {
      const inputs = ["1,,3"];
      mockQuestions(inputs);
  
      const app = new App();
  
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });
  });
});
