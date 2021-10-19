import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as AddIcone } from "../../assets/add.svg";
import { ReactComponent as TrashIcone } from "../../assets/trash.svg";
import { ReactComponent as ArchiveIcone } from "../../assets/archive.svg";
import { ReactComponent as SaveIcone } from "../../assets/edit.svg";
import { ReactComponent as ExportIcone } from "../../assets/export.svg";
import { emailExtraOptionsVariants } from "../../utils/variants";

const EmailExtraOptions = ({ remove, archive, save, exportHTML }) => {
  const [showmore, setShowmore] = useState(false);
  return (
    <Container className={showmore ? "rotate" : null}>
      <div className="email-ectra-floted plus-btn">
        <AddIcone
          onClick={() => {
            setShowmore(!showmore);
          }}
        />
      </div>

      <AnimatePresence exitBeforeEnter>
        {showmore && (
          <>
            <motion.div
              animate="visible"
              initial="hidden"
              variants={emailExtraOptionsVariants}
              className="email-ectra-floted delete"
            >
              <TrashIcone onClick={remove} />
            </motion.div>
            <motion.div
              animate="visible"
              initial="hidden"
              variants={emailExtraOptionsVariants}
              className="email-ectra-floted archive"
            >
              <ArchiveIcone onClick={archive} />
            </motion.div>
            <motion.div
              animate="visible"
              initial="hidden"
              variants={emailExtraOptionsVariants}
              className="email-ectra-floted save"
            >
              <SaveIcone onClick={save} />
            </motion.div>
            <motion.div
              animate="visible"
              initial="hidden"
              variants={emailExtraOptionsVariants}
              className="email-ectra-floted export"
            >
              <ExportIcone onClick={exportHTML} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default EmailExtraOptions;

const Container = styled(motion.div)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  background-color: #222;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  &.rotate {
    border-radius: 10px;
    .plus-btn {
      svg {
        transform: rotate(-45deg);
      }
    }
  }
  .email-ectra-floted {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
    fill: #fff;
    transition: all 0.3s ease-in-out;
    g {
      polygon {
        fill: #fff !important;
      }
      path {
        fill: #fff !important;
      }
    }
  }
  .archive {
    &:hover {
      svg {
        fill: #fcc12b !important;
        g {
          path {
            fill: #fcc12b !important;
          }
        }
      }
    }
  }
  .delete {
    &:hover {
      svg {
        fill: #fc2b36 !important;
        g {
          path {
            fill: #fc2b36 !important;
          }
        }
      }
    }
  }
  .save {
    &:hover {
      svg {
        fill: #7eca9c !important;
        g {
          fill: #7eca9c !important;
          path {
            fill: #7eca9c !important;
          }
        }
      }
    }
  }
  .export {
    &:hover {
      svg {
        fill: #7cb9e8 !important;
        g {
          fill: #7cb9e8 !important;
          path {
            fill: #7cb9e8 !important;
          }
        }
      }
    }
  }
`;
