import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-ads";
import "videojs-ima";
import "videojs-playlist";
import "videojs-playlist-ui";
import "videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

export const VideoJS = (props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isLargeDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;
  const { playlist, track } = useSelector((state) => state.trackPlay);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const newOptions = {
        ...options,
        ...(track && {
          sources: [
            {
              src: track?.file,
            },
          ],
          poster: track?.coverImage,
        }),
      };

      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        newOptions,
        () => {
          videojs.log("player is ready");
          player.ima({
            id: "ima-player",
            adTagUrl:
              "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=",
          });
          onReady && onReady(player);
        }
      ));

      if (playlist.length > 0) {
        player.playlist(playlist);

        player.playlist.autoadvance(0);

        player.playlistUi();
      }

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.on("play", () => {
        console.log("play");

        player.ima.changeAdTag(
          "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
        );
        player.ima.requestAds();
      });

      player.height(options.height);
      player.width(options.width);

      if (track) {
        player.ima.playAdBreak();

        player.src(track?.file);
        player.poster(track?.coverImage);

        player.playlist([]);

        if (player.playlistMenu) {
          player.playlistMenu.dispose();
        }
      }

      if (playlist.length > 0) {
        player.playlist([]);
        player.playlist(playlist);

        player.playlist.first();

        player.playlistUi();

        // request new ads
        // player.ima.playAdBreak();
      }
    }
  }, [videoRef, track, playlist]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div data-vjs-player>
        <div
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {playlist.length > 0 && (
        <div
          className="vjs-playlist"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: isMobile ? "100px" : "180px",
            height: options.height,
            zIndex: 1,
          }}
        ></div>
      )}
    </div>
  );
};

export default VideoJS;
