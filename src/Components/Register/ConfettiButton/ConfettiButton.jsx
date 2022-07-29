import React from "react";

export default function ConfettiButton() {
  return (
    <>
      <button id="button" class="ready" onclick="clickButton();">
        <div class="message submitMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
            <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 " />
            <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3" />
          </svg>{" "}
          <span class="button-text">Submit</span>
        </div>

        <div class="message loadingMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle class="loadingCircle" cx="2.2" cy="10" r="1.6" />
            <circle class="loadingCircle" cx="9.5" cy="10" r="1.6" />
            <circle class="loadingCircle" cx="16.8" cy="10" r="1.6" />
          </svg>
        </div>

        <div class="message successMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline
              stroke="currentColor"
              points="1.4,5.8 5.1,9.5 11.6,2.1 "
            />
          </svg>{" "}
          <span class="button-text">Success</span>
        </div>
      </button>

      <canvas id="canvas"></canvas>

      <a class="website-link" target="_blank" rel="noopener noreferrer">
        <svg class="website-link__icon" viewBox="0 0 936.86 1054.94">
          <circle
            cx="468.43"
            cy="607.07"
            r="395.02"
            fill="#fff"
            stroke="#8aa8c5"
            stroke-width="55"
            stroke-miterlimit="10"
          />
          <path
            d="M235.76 936.24l9.7-135.08c3.7-53.1 43.2-96.01 96.01-93.96h250.85c52.81-2.05 92.33 41.65 96.01 93.96l10.73 135.81s-98.94 65.12-231.06 65.12-232.24-65.85-232.24-65.85z"
            fill="#293b67"
          />
          <circle
            cx="468.43"
            cy="607.07"
            r="395.02"
            fill="none"
            stroke="#8aa8c5"
            stroke-width="55"
            stroke-miterlimit="10"
          />
          <path
            d="M532.23 716.09c0 23.61-35.44 30-64.23 30s-64.23-8.39-64.23-30V607.76h128.46v108.33z"
            fill="#e2cfbb"
          />
          <path
            d="M532.23 678.63s-35.44 8.46-64.23 8.46-64.23-7.83-64.23-7.83v-130.5h128.46v129.87z"
            fill="#d3c2b2"
          />
          <path
            d="M722.57 326.26c0 193.67-79.11 350.67-255.53 350.67s-253.25-157-253.25-350.67 156.76-210.31 253.25-210.31c126.23 0 255.53 16.64 255.53 210.31z"
            fill="#ffe8cc"
          />
          <path
            d="M604.47 634.6c-11.18 8.23-23.2 15.37-36.06 21.33-29.33 13.58-63.06 20.99-101.38 20.99-31.91 0-60.57-5.14-86.1-14.7-50.16-18.78-88.26-54.66-115.33-102.22-35.3-62.04-51.82-143.95-51.82-233.74 0-83.76 29.32-134.41 70.41-164.91-90.46 362.86 101.1 570.06 320.28 473.25z"
            fill="#f3ddc3"
          />
          <path
            d="M701.59 182.44c-6.72-15.99-8.89-39.53-18.6-51.9-1.69-2.16-6.62-3.91-12.43-5.52-15.99-16.61-43.59-39.48-65.94-49.1-7.45-3.21-49.94-38.95-58.11-41.45-6.06-1.85-3.35 25.38-19.3 18.59-31.38-13.36-71.2-32.91-85.46-34.43-17.17-1.84 6.77 41.39-12.69 41.39-36.11 0-65.27-23.14-82.97-25.55-1.48 22.91-9.35 37.78-24.01 44.8-12.97 6.21-42.51.74-53.19 9.43 8.93 20.86-.31 22.93-1.87 37.18-7.32 3.08-17.47 5.36-17.47 5.36-11.17 13.67-10.86 35.77-18.24 54.03-7.44 18.42-12.96 39.27-16.63 62.75-3.65 23.39-3.52 72.17-3.52 101 0 96.83 56.25-132.84 91.88-160.87 35.63-28.02 164-32.7 164-32.7S620 163.71 648.95 193.9c28.95 30.18 75.9 249.36 75.9 160.96 0-59.25-7.63-135.22-23.26-172.42z"
            fill="#f2cf6f"
          />
          <path
            d="M441.75 18.63c-15.02-1.61 1.38 31.23-7.26 39.53 15.28-3.58 10.26-39.58 7.26-39.53z"
            fill="#d8b45c"
          />
          <path
            d="M346.09 34.47c-1.48 22.91-12.06 43.85-33.99 47.54 12.81-1.1 21.29 3.03 34.75-2.18 17.45-6.76 16.94-42.95-.76-45.36z"
            fill="#d8b45c"
          />
          <path
            d="M268.89 88.7c8.93 20.86-.31 22.93-1.87 37.18-7.32 3.08-17.47 5.36-17.47 5.36-11.17 13.67-10.86 35.77-18.24 54.03-7.44 18.42-12.96 39.27-16.63 62.75-3.65 23.39 15.73-33.35 48.77-64.39 32.36-30.39 16.12-103.62 5.44-94.93z"
            fill="#d8b45c"
          />
          <path
            d="M505.31 460.4c0-10.8-16.63-19.55-37.14-19.55s-37.14 8.75-37.14 19.55 74.28 10.79 74.28 0z"
            fill="#d3bfae"
          />
          <path
            d="M330.65 366.32c28.67-30.62 53.86-31.06 82.1 0"
            fill="none"
            stroke="#000"
            stroke-width="14"
            stroke-linecap="round"
            stroke-miterlimit="10"
          />
          <path
            d="M521.65 366.32c28.67-30.62 53.86-31.06 82.1 0"
            fill="none"
            stroke="#000"
            stroke-width="14"
            stroke-linecap="round"
            stroke-miterlimit="10"
          />
          <path
            d="M468.01 617.93c-35.42 0-71.93-28.05-71.93-55.82 0-12.56 10.52-18.84 23.38-18.84h97.43c12.86 0 23.38 6.31 23.38 18.84 0 30.2-36.84 55.82-72.26 55.82z"
            fill="#824446"
          />
          <defs>
            <path
              id="a"
              d="M468.01 617.93c-35.42 0-71.93-28.05-71.93-55.82 0-12.56 10.52-18.84 23.38-18.84h97.43c12.86 0 23.38 6.31 23.38 18.84 0 30.2-36.84 55.82-72.26 55.82z"
            />
          </defs>
          <clipPath id="b">
            <use xlink:href="#a" overflow="visible" />
          </clipPath>
          <circle
            cx="468.17"
            cy="614.05"
            r="30"
            clip-path="url(#b)"
            fill="#f37879"
          />
        </svg>
        <span class="website-link__name">
          Cooper <span class="website-link__last-name">Goeke</span>
        </span>
        <span class="website-link__message">Check out more of my work</span>
      </a>
      <script></script>
    </>
  );
}
