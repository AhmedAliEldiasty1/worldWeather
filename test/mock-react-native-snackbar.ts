jest.mock("react-native-snackbar", () => {
  return {
    show: jest.fn(),
  }
})
