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

const ERROR_CASES = [
  ["음수 포함", "-1,2,3"],
  ["숫자가 아닌 문자 포함", "a,b,3"],
  ["커스텀 구분자 정의 시작이 '//'가 아님", "/?\\n1,2,3"],
  ["커스텀 구분자 정의에 줄바꿈('\\n')이 없음", "//?n1,2,3"],
  ["커스텀 구분자로 빈 문자열 지정", "//\\n1,2,3"],
];

const CUSTOM_DELIMITER_CASES = [
  ["빈 문자열 입력", "//?\\n", 0],
  ["숫자 없이 구분자만 존재", "//!\\n,,!:", 0],
  ["커스텀과 기본 구분자 혼용 (쉼표만)", "//!\\n1!2,3", 6],
  ["커스텀과 기본 구분자 혼용 (콜론만)", "//!\\n1!2:3:", 6],
  ["기본 구분자 여러 개 사용", "//!\\n1,2:3,4:5", 15],
  ["커스텀 구분자 하나만 사용", "//?\\n1?2?3", 6],
  ["커스텀 구분자와 기본 구분자 혼용", "//!\\n1,2:3!4", 10],
  ["커스텀 구분자로 공백이 지정", "// \\n1,2:3 4", 10],
];

const NO_CUSTOM_DELIMITER_CASES = [
  ["빈 문자열", "", 0],
  ["숫자 없이 구분자만 존재", ",,:", 0],
  ["기본 구분자 중 쉼표만 사용", "1,2,3", 6],
  ["기본 구분자 중 콜론만 사용", "1:2:3", 6],
  ["기본 구분자 여러 개 사용", "1,2:3,4:5", 15],
];

describe("문자열 계산기", () => {
  describe("예외 테스트", () => {
    test.each(ERROR_CASES)(
      '[%s] 입력 "%s" -> 출력: [ERROR]',
      async (description, input) => {
        const app = new App();
        mockQuestions([input]);
        await expect(app.run()).rejects.toThrow("[ERROR]");
      },
    );
  });

  describe("커스텀 구분자가 있는 경우", () => {
    test.each(CUSTOM_DELIMITER_CASES)(
      '[%s] 입력 "%s" -> 출력: %s',
      async (description, input, expectedSum) => {
        const app = new App();
        mockQuestions([input]);
        const logSpy = getLogSpy();
        await app.run();

        const expectedOutput = `결과 : ${expectedSum}`;
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedOutput));
      },
    );
  });

  describe("커스텀 구분자가 없는 경우", () => {
    test.each(NO_CUSTOM_DELIMITER_CASES)(
      '[%s] 입력 "%s" -> 출력: %s',
      async (description, input, expectedSum) => {
        const app = new App();
        mockQuestions([input]);
        const logSpy = getLogSpy();
        await app.run();

        const expectedOutput = `결과 : ${expectedSum}`;
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedOutput));
      },
    );
  });
});
