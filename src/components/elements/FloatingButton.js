import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as AddIcone } from "../../assets/add.svg";
import { ReactComponent as TrashIcone } from "../../assets/trash.svg";
import { ReactComponent as ArchiveIcone } from "../../assets/archive.svg";
import colorsPalette from "../../utils/colors";
import { floatingBtnVariants } from "../../utils/variants";

const FloatingButton = ({ remove, archive }) => {
  const [showmore, setShowmore] = useState(false);
  return (
    <Container bg={colorsPalette.menuBG}>
      <AnimatePresence>
        {showmore && (
          <>
            <div className="popover-wrp">
              <p className="popover-floating">Archive user</p>
              <motion.div
                animate="visible"
                initial="hidden"
                exit="exit"
                variants={floatingBtnVariants}
                className="more-options archive "
              >
                <ArchiveIcone onClick={archive} />
              </motion.div>
            </div>
            <div className="popover-wrp">
              <p className="popover-floating">Delete user</p>
              <motion.div
                initial="hidden"
                exit="exit"
                variants={floatingBtnVariants}
                className="more-options delete"
              >
                <TrashIcone onClick={remove} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <div
        className={
          showmore ? "more-options plus-sign rotated" : "more-options plus-sign"
        }
      >
        <AddIcone onClick={() => setShowmore(!showmore)} />
      </div>
    </Container>
  );
};

export default FloatingButton;

const Container = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  .popover-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      .popover-floating {
        display: block;
      }
    }
  }
  .popover-floating {
    position: absolute;
    left: -210%;
    background: #222;
    color: #fff;
    font-size: 14px;
    padding: 0.5em;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    display: none;
  }

  .more-options {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.25em 0;
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
    &.rotated {
      svg {
        transform: rotate(-45deg);
      }
    }
  }
  .plus-sign {
    background: ${(props) => props.bg};
  }
  .archive {
    background: #fcc12b;
  }
  .delete {
    background: #fc2b36;
  }
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
    fill: #fff;
    transition: all 0.3s ease-in-out;
  }
`;
