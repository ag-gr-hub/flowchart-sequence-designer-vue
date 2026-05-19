import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReactBridge } from "./react-bridge";

// Mock react-dom/client
const mockRender = vi.fn();
const mockUnmount = vi.fn();
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: mockRender,
    unmount: mockUnmount,
  })),
}));

// Mock react
vi.mock("react", () => ({
  createElement: vi.fn((component, props) => ({ component, props })),
}));

describe("ReactBridge", () => {
  const FakeComponent = () => null;

  beforeEach(() => {
    mockRender.mockClear();
    mockUnmount.mockClear();
  });

  it("should mount and render a component", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    const container = document.createElement("div");
    bridge.mount(container);
    expect(mockRender).toHaveBeenCalledTimes(1);
  });

  it("should not mount twice", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    const container = document.createElement("div");
    bridge.mount(container);
    bridge.mount(container);
    expect(mockRender).toHaveBeenCalledTimes(1);
  });

  it("should update props and re-render", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    const container = document.createElement("div");
    bridge.mount(container);
    bridge.update({ value: 2 });
    expect(mockRender).toHaveBeenCalledTimes(2);
  });

  it("should merge props on update", () => {
    const bridge = new ReactBridge(FakeComponent, { a: 1, b: 2 } as any);
    const container = document.createElement("div");
    bridge.mount(container);
    bridge.update({ b: 3 } as any);
    // Second render call should have merged props
    expect(mockRender).toHaveBeenCalledTimes(2);
  });

  it("should unmount the root", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    const container = document.createElement("div");
    bridge.mount(container);
    bridge.unmount();
    expect(mockUnmount).toHaveBeenCalledTimes(1);
  });

  it("should not fail when unmounting without mount", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    expect(() => bridge.unmount()).not.toThrow();
  });

  it("should not render after unmount", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    const container = document.createElement("div");
    bridge.mount(container);
    bridge.unmount();
    mockRender.mockClear();
    bridge.update({ value: 3 });
    expect(mockRender).not.toHaveBeenCalled();
  });

  it("should expose the component via getComponent", () => {
    const bridge = new ReactBridge(FakeComponent, { value: 1 });
    expect(bridge.getComponent()).toBe(FakeComponent);
  });
});
