import * as React from "react";
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

export const Loading = () => (
  <main
    className="flex justify-center items-center bg-gradient-to-b from-black-500 to-black-900"
    style={{ overscrollBehavior: "none" }}
  >
    <div className="w-150 h-150 flex items-center justify-center overflow-hidden bg-opacity-20 rounded-3xl">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1400 980"
        className="w-screen h-screen overflow-visible stroke-[#fff] stroke-width-[2] stroke-linejoin-round stroke-linecap-round"
      >
        <motion.path
          d="M 747.8585815429688 504.2118835449219 L 718.3665161132812 499.80194091796875 L 713.7261962890625 525.1544799804688 L 740.1721801757812 529.1089477539062 L 736.4545288085938 543.5579833984375 L 711.1162109375 539.7692260742188 L 710.2944946289062 544.3176879882812 L 706.5730590820312 580.56591796875 L 687.1885375976562 577.6673583984375 L 693.881103515625 544.2698974609375 L 701.4742431640625 482.1295166015625 L 751.5969848632812 489.62432861328125 L 747.8585815429688 504.2118835449219 ZM 782.6971435546875 565.2680053710938 L 784.3674926757812 565.08837890625 L 788.7522583007812 540.3978881835938 L 797.3943481445312 483.28619384765625 L 814.5066528320312 483.9801940917969 L 803.8859252929688 541.0230712890625 L 797.11572265625 580.1917114257812 L 771.5588989257812 584.77099609375 L 757.6785278320312 548.6683349609375 L 735.4082641601562 493.4733581542969 L 754.7999877929688 487.86749267578125 L 773.2459106445312 540.2351684570312 L 782.6971435546875 565.2680053710938 Z"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
          }}
        />
      </motion.svg>
    </div>
  </main>
);

export default Loading;
