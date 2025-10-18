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

  describe("커스텀 구분자가 있는 경우", () => {
    test("빈 문자열 입력", async () => {
      const inputs = ["//?\\n"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 0"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("숫자 없이 구분자만 존재", async () => {
      const inputs = ["//;\\n,,;:"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 0"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 중 쉼표만 사용", async () => {
      const inputs = ["//;\\n1,2,3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 중 콜론만 사용", async () => {
      const inputs = ["//;\\n1:2:3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 여러개 사용", async () => {
      const inputs = ["//;\\n1,2:3,4:5"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 15"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("커스텀 구분자 하나만 사용", async () => {
      const inputs = ["//;\\n1;2;3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("커스텀 구분자와 기본 구분자 혼용", async () => {
      const inputs = ["//;\\n1,2:3;4"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 10"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("커스텀 구분자로 공백이 지정", async () => {
      const inputs = ["// \\n1,2:3 4"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 10"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });
  });

  describe("커스텀 구분자가 없는 경우", () => {
    test("빈 문자열이 입력된 경우", async () => {
      const inputs = [""];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 0"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("숫자 없이 구분자만 존재", async () => {
      const inputs = [",,:"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 0"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 중 쉼표만 사용", async () => {
      const inputs = ["1,2,3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 중 콜론만 사용", async () => {
      const inputs = ["1:2:3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 여러개 사용", async () => {
      const inputs = ["1,2:3,4:5"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 15"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

  });
});
