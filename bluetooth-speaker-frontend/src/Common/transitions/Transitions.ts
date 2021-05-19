// @ts-ignore
import { room, drop, glide } from "react-tiger-transition";

room({
  name: "room-left",
  direction: "left",
  angle: 90,
  enter: {
    duration: 600,
    easing: "ease",
    opacity: 1,
    zIndex: 1,
    delay: 0,
  },
  exit: {
    duration: 600,
    easing: "ease",
    opacity: 1,
    zIndex: 2,
    delay: 0,
  },
});

room({
  name: "room-right",
  direction: "right",
  angle: 90,
  enter: {
    duration: 600,
    easing: "ease",
    opacity: 1,
    zIndex: 1,
    delay: 0,
  },
  exit: {
    duration: 600,
    easing: "ease",
    opacity: 1,
    zIndex: 2,
    delay: 0,
  },
});

drop({
  name: "drop-bottom",
  direction: "bottom",
  enter: {
    duration: 800,
    easing: "ease",
    opacity: 1,
    zIndex: 2,
    delay: 0,
  },
  exit: {
    duration: 800,
    easing: "ease",
    opacity: 0.3,
    zIndex: 1,
    scale: 0.6,
    delay: 0,
  },
});

drop({
  name: "drop-top",
  direction: "top",
  enter: {
    duration: 800,
    easing: "ease",
    opacity: 1,
    zIndex: 2,
    delay: 0,
  },
  exit: {
    duration: 800,
    easing: "ease",
    opacity: 0.3,
    zIndex: 1,
    scale: 0.6,
    delay: 0,
  },
});

glide({
  name: "glide-left",
  direction: "left",
});

glide({
  name: "glide-right",
  direction: "right",
});
