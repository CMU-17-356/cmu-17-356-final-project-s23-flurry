import renderer from "react-test-renderer";

import LoginScreen from "../screens/LoginScreen";

test("login screen rendering", async () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
