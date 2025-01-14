import { useState, useEffect, useRef, memo } from "react";
import "./ClusterBean.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import useTime from "components/hooks/useTime";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";

type BeanProps = {
  nickname: string[];
  content: string;
  color: number[];
  createdAt: string;
  contentFilter: boolean;
};

function ClusterBean({
  nickname,
  content,
  color,
  contentFilter,
  createdAt,
}: BeanProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSidebar] = useRecoilState(sidebarState);
  const [elapsedText] = useTime(createdAt);
  const beanRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);
  const colorList = getColor(color);
  const navigate = useNavigate();
  const location = useLocation();

  function controlBean() {
    const bean = beanRef.current;
    if (bean) {
      bean.className = isOpen ? "cluster-bean close" : "cluster-bean open";
    }
    setIsOpen(!isOpen);
    if (!isOpen && bean) {
      setTimeout(() => {
        setIsOpen(false);
        bean.className = "cluster-bean close";
      }, 3000);
    }
  }

  useEffect(() => {
    controlBean();
  }, [createdAt]);

  return (
    <div
      onClick={() => {
        if (isOpen && location.pathname !== "/sidebar") {
          setSidebar(2);
          navigate("/sidebar");
        }
      }}
    >
      <div className="cluster-bean open" ref={beanRef} onClick={controlBean}>
        <div
          className={
            color.length > 2
              ? "nickname-cluster three"
              : color.length > 1
              ? "nickname-cluster two"
              : "nickname-cluster"
          }
        >
          {color.length > 2 && (
            <div
              className="nickname-container third"
              style={{
                color: colorList[0].color,
                backgroundColor: colorList[0].backgroundColor,
              }}
            >
              {nickname[0][0]}
            </div>
          )}
          {color.length > 1 && (
            <div
              className="nickname-container second"
              style={{
                color: colorList[color.length - 2].color,
                backgroundColor: colorList[color.length - 2].backgroundColor,
              }}
            >
              {nickname[color.length - 2][0]}
            </div>
          )}
          <div
            className="nickname-container"
            style={{
              color: colorList[color.length - 1].color,
              backgroundColor: colorList[color.length - 1].backgroundColor,
            }}
          >
            {nickname[color.length - 1][0]}
          </div>
        </div>
        <div className="contents-container">
          <CSSTransition
            in={isOpen}
            nodeRef={nodeRef}
            timeout={500}
            classNames="fade"
            unmountOnExit
            onEnter={() => controlBean}
            onExited={() => controlBean}
          >
            <div ref={nodeRef}>
              <div className="up">
                <div>
                  <h4>{nickname[nickname.length - 1]}</h4>
                </div>
                <div className="time">{elapsedText}</div>
              </div>
              {content === "" ? (
                <div className="down">사진을 보냈습니다.</div>
              ) : (
                <div className="down">
                  <div style={{ whiteSpace: "pre-line" }}>
                    {contentFilter
                      ? "부적절한 단어가 포함되어 있습니다."
                      : content.replaceAll("<br/>", "\r\n")}
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

function getColor(color: number[]) {
  const IndexToColor = [
    { name: "완두콩", backgroundColor: "#c7f2a4", color: "black" },
    { name: "강낭콩", backgroundColor: "#e80081", color: "white" },
    { name: "쥐눈이콩", backgroundColor: "#A6A6A6", color: "black" },
    { name: "렌틸콩", backgroundColor: "#F57329", color: "black" },
    { name: "병아리콩", backgroundColor: "#FFE9A0", color: "black" },
    { name: "녹두", backgroundColor: "#377E19", color: "white" },
    { name: "땅콩", backgroundColor: "#E6BD46", color: "black" },
    { name: "검은콩", backgroundColor: "#4E4E4E", color: "white" },
    { name: "팥", backgroundColor: "#CC3737", color: "white" },
    { name: "젤리빈", backgroundColor: "#375E97", color: "white" },
  ];
  return color.map((idx) => {
    const backgroundColor: string = IndexToColor[idx].backgroundColor;
    const newColor: string = IndexToColor[idx].color;
    return { color: newColor, backgroundColor: backgroundColor };
  });
}

export default memo(ClusterBean);
