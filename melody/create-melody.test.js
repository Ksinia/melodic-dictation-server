const melodyCreate = require("./create-melody");

const mockRequest = body => ({
  user: { id: 1 },
  body
});

const mockResponse = () => ({
  send: jest.fn().mockImplementation(function(data) {
    Object.assign(this, data);
  })
});

jest.mock("../models", () => {
  const SequelizeMock = require("sequelize-mock");
  const DBConnectionMock = new SequelizeMock();
  const Melody = DBConnectionMock.define("Melody");

  return { Melody };
});

describe("Create melody", () => {
  test("succeed melody creation", async () => {
    const melody = {
      name: "Simple dictation",
      url: "/music/dictation_1.mid",
      abcStart: "X:1\nM:2/4\nL:1/8\nK:C",
      abcNotes: ["C2", "D2", "|", "C4"]
    };
    const req = mockRequest(melody);
    const res = mockResponse();

    await melodyCreate(req, res);

    expect(res.send).toHaveBeenCalled();
    expect(res.dataValues).toEqual(expect.objectContaining(melody));
    expect(res.dataValues).toHaveProperty("createdAt");
    expect(res.dataValues).toHaveProperty("updatedAt");
  });
});
