const pageContainersVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, type: "Inertia" },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};
const popupVariants = {
  hidden: { opacity: 0, y: "100vh" },
  visible: {
    opacity: 1,
    y: 1,
    transition: { type: "Inertia" },
  },
  exit: {
    opacity: 0,
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};
const popupbgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { type: "Inertia" },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};
const popupContentVariants = {
  hidden: { y: "100vh" },
  visible: {
    y: 0,
    transition: { type: "Inertia", delay: 0.5 },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
};
const bubbleVariants = {
  hidden: { opacity: 0, y: "100vh" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "Inertia" },
  },
};
const mapItemVariants = {
  hidden: { scale: 0, y: "100vh" },
  visible: {
    scale: 1,
    y: 0,
    transition: { type: "Inertia" },
  },
  exit: {
    scale: 0,
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
const floatingBtnVariants = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: { type: "Inertia" },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const floatingRightBtnVariants = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: { type: "Inertia" },
  },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};
const cardVariants = {
  hidden: { opacity: 0, x: "100px" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "Inertia", delay: 0.5 },
  },
};
const feedbackVariants = {
  hidden: { opacity: 0, y: "100px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5, type: "Inertia" },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};
const svgVariants = {
  hidden: { opacity: 0, y: "100px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, type: "Inertia" },
  },
  exit: {
    opacity: 0,
    y: "-100px",
    transition: { ease: "easeInOut" },
  },
};
const statsTestVariants = {
  hidden: { opacity: 0, y: "10px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.75, type: "Inertia" },
  },
  exit: {
    opacity: 0,
    y: "-10px",
    transition: { ease: "easeInOut" },
  },
};
const cardStatsVariants = {
  hidden: { opacity: 0, x: "100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "Inertia" },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const trackedPageVariants = {
  hidden: { opacity: 0, x: "100vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "Inertia", delay: 0.5 },
  },
  exit: {
    opacity: 0,
    x: "100vw",
    transition: { ease: "easeInOut" },
  },
};

const trackedPageInfoVariants = {
  hidden: { opacity: 0, y: "100px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "Inertia", delay: 0.5 },
  },
  exit: {
    opacity: 0,
    y: "-100px",
    transition: { ease: "easeInOut" },
  },
};

const emailExtraOptionsVariants = {
  hidden: { opacity: 0, x: "100px" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "Inertia" },
  },
};

export {
  pageContainersVariants,
  popupVariants,
  bubbleVariants,
  mapItemVariants,
  floatingBtnVariants,
  popupContentVariants,
  popupbgVariants,
  cardVariants,
  feedbackVariants,
  svgVariants,
  statsTestVariants,
  cardStatsVariants,
  floatingRightBtnVariants,
  trackedPageVariants,
  trackedPageInfoVariants,
  emailExtraOptionsVariants,
};
