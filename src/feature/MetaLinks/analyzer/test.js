"use strinct";
import { after, afterEach, before, beforeEach, describe, it } from "node:test";
import assert from "node:assert";

import { validateProtoMetaLinks } from "./index.js";

describe("validateProtoMetaLinks", () => {
  let consoleOutput;
  let consoleErrorOrigin;

  before(() => {
    consoleOutput = [];
    consoleErrorOrigin = console.error;
    console.error = (...args) => {
      consoleOutput.push([...args]);
    };
  });

  beforeEach(() => {
    consoleOutput = [];
  });

  after(() => {
    console.error = consoleErrorOrigin;
  });

  it("validates a correct ProtoMetaLinks object without errors", () => {
    const validData = {
      title: "Main",
      items: [{ title: "Item 1", url: "https://example.com" }],
      links: [{ title: "Link 1", items: [{ title: "SubLink 1" }] }],
    };

    validateProtoMetaLinks(validData);
    assert.strictEqual(consoleOutput.length, 0);
  });

  it("logs error for missing title", () => {
    const invalidData = {
      title: "",
      items: [],
    };

    validateProtoMetaLinks(invalidData);
    assert.strictEqual(
      consoleOutput[0][0],
      "At: root.\n Incorrect syntax pml value: title is required!",
    );
  });

  it("logs error for invalid url type", () => {
    const invalidData = {
      title: "Main",
      url: 123,
    };

    validateProtoMetaLinks(invalidData);
    assert.strictEqual(
      consoleOutput[0][0],
      "[Type Error] At: root.\n Value url must be a string but now is number",
    );
  });

  it("logs error for non-array items", () => {
    const invalidData = {
      title: "Main",
      items: "not an array",
    };

    validateProtoMetaLinks(invalidData);
    assert.strictEqual(
      consoleOutput[0][0],
      "[Type Error] At: root.\n Value items must be a array but now is string",
    );
  });

  it("logs errors for deeply nested invalid objects", () => {
    const invalidData = {
      title: "Main",
      items: [
        {
          title: "Item 1",
          items: [{ title: "", url: 456 }],
        },
      ],
    };

    validateProtoMetaLinks(invalidData);
    assert.strictEqual(
      consoleOutput[0][0],
      "At: root.items[0].items[0].\n Incorrect syntax pml value: title is required!",
    );
    assert.strictEqual(
      consoleOutput[1][0],
      "[Type Error] At: root.items[0].items[0].\n Value url must be a string but now is number",
    );
  });

  it("logs error for non-array links", () => {
    const invalidData = {
      title: "Main",
      links: "not an array",
    };

    validateProtoMetaLinks(invalidData);
    assert.strictEqual(
      consoleOutput[0][0],
      "[Type Error] At: root.\n Value links must be a array but now is string",
    );
  });
});
