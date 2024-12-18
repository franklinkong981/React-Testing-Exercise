import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import { expect, it } from "vitest";

//Smoke test
it("renders the Carousel component without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
});

//snapshot test
it("matches the snapshot of the Carousel component", function() {
	const {asFragment} = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
	expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow and the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  let leftArrow = container.querySelector(".bi-arrow-left-circle");

  //when we are on the first image, the left arrow isn't present.
  expect(leftArrow).not.toBeInTheDocument();

  //move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  //move backward in the carousel
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  
  //expect the first image to show, not the second nor third
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 3"]')).not.toBeInTheDocument();

  //move to the end of the carousel
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  //expect the third image to show, not the first nor second.
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 3"]')).toBeInTheDocument();

  //Finally, since we're on the last image, expect the right arrow to not show.
  expect(rightArrow).not.toBeInTheDocument();
});