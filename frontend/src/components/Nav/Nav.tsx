import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarState } from "store/atom";
import ReactTooltip from "react-tooltip";
import "./Nav.scss";
// import createButton from "assets/img/chat-button.svg";
import { ReactComponent as CreateButton } from "assets/img/chat-button.svg";
import openIcon from "assets/img/Expand_right_light.svg";
import Lottie from "lottie-react";
import aroundTheWorld from "assets/img/around-the-world.json";
import bubbleChat from "assets/img/bubble-chat.json";
import likeAni from "assets/img/like.json";
import locationAni from "assets/img/location.json";
import pinAni from "assets/img/pin.json";
import searchAni from "assets/img/search.json";
import chat from "assets/img/Chat.svg";
import logo from "assets/img/Logo.svg";
import { ReactComponent as BottomBridge } from "assets/img/bottom-bar.svg";

export default function Nav() {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);
  const [isKeyword, setIsKeyword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <div className="bottom-bar">
        <div className="button-container" onClick={() => navigate("/sidebar")}>
          <Lottie animationData={bubbleChat} className="ani-img bubleChat" />
        </div>
        <BottomBridge className="barImage" />
        {/* <img className="barImage" src={bottomBar} alt="navImage" /> */}
        <div
          className="button-container"
          onClick={() => {
            navigate(isKeyword ? "/" : "/keyword");
            setIsKeyword(!isKeyword);
          }}
        >
          <Lottie
            animationData={isKeyword ? aroundTheWorld : searchAni}
            className={
              isKeyword ? "ani-img aroundTheWorld" : "ani-img searchAni"
            }
          />
        </div>
      </div>
      <div
        className="handle"
        onClick={() => {
          navigate("/sidebar");
        }}
      >
        <img src={openIcon} alt="open" />
      </div>
      <div className="create-button">
        <CreateButton
          className="create-button-img"
          onClick={() => navigate("/create")}
          width="34"
          height="34"
          viewBox="3 3 18 18"
        />
        {/* <img
          className="create-button-img"
          onClick={() => navigate("/create")}
          src={createButton}
          alt="chat-button"
        /> */}
      </div>
      <div className="sidebar-fix">
        <div className="side-logo">
          <img
            src={logo}
            alt="logo"
            onClick={() => {
              alert("Beanzido is World Best Social Map Community.");
            }}
          />
        </div>
        <div
          className={
            location.pathname === "/sidebar"
              ? sidebar === 0
                ? "switch-container first"
                : "switch-container second"
              : "switch-container"
          }
        >
          <div
            className="switch"
            data-for={isKeyword ? "community" : "keyword"}
            data-tip
          >
            <Lottie
              animationData={isKeyword ? aroundTheWorld : searchAni}
              className={
                isKeyword ? "ani-img aroundTheWorld" : "ani-img searchAni"
              }
              onClick={() => {
                navigate(isKeyword ? "/" : "/keyword");
                setIsKeyword(!isKeyword);
              }}
            />
            {isKeyword ? (
              <ReactTooltip
                id="community"
                getContent={(dataTip) => "커뮤니티 보기"}
                place="top"
                effect="solid"
              />
            ) : (
              <ReactTooltip
                id="keyword"
                getContent={(dataTip) => "지역별 키워드 보기"}
                place="right"
                effect="solid"
              />
            )}
          </div>
          <div
            className="switch all"
            onClick={() => {
              if (location.pathname !== "/sidebar") {
                navigate("/sidebar");
              }
              setSidebar(0);
            }}
            data-for="all-bean"
            data-tip
          >
            <Lottie animationData={bubbleChat} className="ani-img bubbleChat" />
            <ReactTooltip
              id="all-bean"
              getContent={(dataTip) => "전체 콩"}
              place="right"
              effect="solid"
            />
          </div>
          <div
            className="switch focus"
            onClick={() => {
              if (location.pathname !== "/sidebar") {
                navigate("/sidebar");
              }
              setSidebar(1);
            }}
            data-for="one-bean"
            data-tip
          >
            <Lottie animationData={pinAni} className="ani-img pin" />
            <ReactTooltip
              id="one-bean"
              getContent={(dataTip) => "개별 콩"}
              place="right"
              effect="solid"
            />
          </div>
        </div>
        {location.pathname !== "/feedback" && (
          <div
            className="feedback-button"
            onClick={() => navigate("/feedback")}
            data-for="feedback-btn"
            data-tip
          >
            <Lottie className="feedback-button-img" animationData={likeAni} />
          </div>
        )}
        <ReactTooltip
          id="feedback-btn"
          getContent={(dataTip) => "피드백"}
          place="right"
          effect="solid"
        />
      </div>
    </nav>
  );
}