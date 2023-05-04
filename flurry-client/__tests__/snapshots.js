import renderer from "react-test-renderer";

import LoginScreen from "../Screens/LoginScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import MapScreen from "../screens/MapScreen";

test("login screen rendering", async () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("map screen rendering", async () => {
  const tree = renderer.create(<MapScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("analytics screen rendering", async () => {
  const tree = renderer.create(<AnalyticsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
