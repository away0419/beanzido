import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CSSTransition } from "react-transition-group";
import { mapLevelState, isKeywordRankState, mapCenterState } from "store/atom";
import NavToolTip from "./NavToolTip";
import CommunityIcons from "./CommunityIcons";
import KeywordIcons from "./KeywordIcons";
import SidebarKeyword from "components/Sidebar/SidebarKeyword";
import KeywordButton from "./KeywordButton";
import useGeolocation from "components/hooks/useGeolocation";
import IntroModal from "components/IntroModal/IntroModal";
import ModalPortal from "Portal";
import "./Nav.scss";
import { ReactComponent as CreateSVG } from "assets/img/chat-button.svg";
import { ReactComponent as BottomBridge } from "assets/img/bottom-bar.svg";
import openIcon from "assets/img/Expand_right_light.svg";
import Lottie from "lottie-react";
import aroundTheWorld from "assets/img/around-the-world.json";
import bubbleChat from "assets/img/bubble-chat.json";
import podium from "assets/img/podium.json";
import likeAni from "assets/img/like.json";
import searchAni from "assets/img/search.json";
import logo from "assets/img/Logo.svg";

export default function Nav() {
  const [, setLevel] = useRecoilState(mapLevelState);
  const [isKeyword, setIsKeyword] = useState(false);
  const [isIntro, setIsIntro] = useState(false);
  const keywordRef = useRef(null);
  const communityRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isKeywordRank, setIsKeywordRank] = useRecoilState(isKeywordRankState);
  const [, setMapCenter] = useRecoilState(mapCenterState);
  const { coordinates } = useGeolocation();

  useEffect(() => {
    if (location.pathname.slice(0, 8) === "/keyword") {
      setIsKeyword(true);
    } else {
      setIsKeyword(false);
      setIsKeywordRank(false);
    }
  }, [location.pathname]);

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="로고" onClick={() => setIsIntro(true)} />
      </div>
      <div className="bottom-bar">
        {isKeyword ? (
          <div
            className="button-container"
            onClick={() => {
              setIsKeywordRank(true);
            }}
          >
            <Lottie animationData={podium} className="ani-img podium" />
          </div>
        ) : (
          <div
            className="button-container"
            onClick={() => navigate("/sidebar")}
          >
            <Lottie animationData={bubbleChat} className="ani-img bubleChat" />
          </div>
        )}
        <BottomBridge className="barImage" />
        <div
          className="button-container"
          onClick={() => {
            navigate(isKeyword ? "/" : "/keyword");
            setIsKeyword(!isKeyword);
            setMapCenter({
              lat: coordinates.lat,
              lng: coordinates.lng,
              loaded: true,
              isPanto: true,
            });
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
        className={
          location.pathname.slice(0, 8) !== "/keyword"
            ? "handle"
            : "handle-keyword"
        }
        onClick={() => {
          // eslint-disable-next-line no-lone-blocks
          {
            location.pathname.slice(0, 8) !== "/keyword"
              ? navigate("/sidebar")
              : setIsKeywordRank(true);
          }
        }}
      >
        <img src={openIcon} alt="open" />
      </div>
      <CSSTransition
        classNames="transition"
        in={isKeywordRank}
        timeout={500}
        unmountOnExit
      >
        <SidebarKeyword />
      </CSSTransition>
      {isKeyword ? (
        <KeywordButton />
      ) : (
        <div className="create-button" onClick={() => navigate("/create")}>
          <CreateSVG width="34" height="34" viewBox="3 3 18 18" />
        </div>
      )}
      <div className="sidebar-fix">
        <div className="side-logo">
          <img src={logo} alt="logo" onClick={() => setIsIntro(true)} />
        </div>
        <div className="side-container">
          <CSSTransition
            in={isKeyword}
            nodeRef={keywordRef}
            classNames="transition"
            timeout={500}
          >
            <div className={"switch-container"} ref={keywordRef}>
              <KeywordIcons />
            </div>
          </CSSTransition>
          <CSSTransition
            in={!isKeyword}
            nodeRef={communityRef}
            classNames="transition"
            timeout={500}
          >
            <div className={"switch-container"} ref={communityRef}>
              <CommunityIcons />
            </div>
          </CSSTransition>
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
      </div>
      <NavToolTip />
      <ModalPortal>
        <CSSTransition
          in={isIntro}
          classNames="transition"
          timeout={500}
          unmountOnExit
        >
          <IntroModal setIsIntro={setIsIntro} />
        </CSSTransition>
      </ModalPortal>
    </nav>
  );
}
