import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.jsx";
import TEST_IMAGES from "./_testCommon.js";

//Smoke test
it("renders the Card component without crashing", () => {
  render(<Card caption={TEST_IMAGES[0].caption} src={TEST_IMAGES[0].src} currNum={1} totalNum={TEST_IMAGES.length}/>);
});

//snapshot test
it("matches the snapshot of the Card component", function() {
	const {asFragment} = render(<Card caption={TEST_IMAGES[0].caption} src={TEST_IMAGES[0].src} currNum={1} totalNum={TEST_IMAGES.length}/>);
	expect(asFragment()).toMatchSnapshot();
});